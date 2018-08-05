// # define working dir root
def rootPath = new File(".").getCanonicalPath()


final String REPLACE_KEY = "CONTENT_TO_REPLACE"

// # copy resources
String sourceDir = "${rootPath}/src/res"
String destinationDir = "${rootPath}/docs/res"

new AntBuilder().copy(todir: destinationDir) {
    fileset(dir: sourceDir)
}

// # compile basic pages
def htmlReplaceMap = [:]
new File("${rootPath}/src").eachFile { file ->
    if (!file.isDirectory()) {
        def fileName = file.getName()
        if (fileName.startsWith("_"))
            htmlReplaceMap.put fileName, file.text
    }

}

htmlReplaceMap.put "_RP_CURRENT_TIME", "${System.currentTimeMillis()}"

// # generate page.html
new File("${rootPath}/src/page_tpl.html").with { templateFile ->

    def html = templateFile.text
    htmlReplaceMap.each { name, text ->
        html = html.replaceAll(name, text)
    }

    new File("${rootPath}/tmp/page.html").newWriter().withWriter { w ->
        w << html
    }
}

// convert md file to data map
def buildDataFromMdFile(File file, boolean formatContent) {

    String dataText = file.text

    def dataMap = [:]

    def keys = []

    String key = null

    dataText.eachLine { line ->

        // reach a new key line
        if (line.startsWith("##")) {

            // mark new key and truncate value
            key = line.replaceAll("##", "").replaceAll(" ", "")

            // remember key orders
            keys.add(key)

        } else {


            if (!key)
                return

            if (key.startsWith("images")) {

                List images = dataMap.get(key)

                if (!images || images.size() == 0) {
                    images = []
                    dataMap.put key, images
                }


                images.add(line)


            } else {


                if (!dataMap.containsKey(key))
                    dataMap.put(key, "")

                String value = dataMap.get(key)

                if (
                formatContent &&
                        key.indexOf("content") >= 0
                ) {
                    value += "${line}<br>"
                } else {
                    value += line
                }


                dataMap.put(key, value)


            }
        }
    }


    println "${file.absolutePath}"
    println "dataMap = ${dataMap}"
    println "keys = ${keys}"

    return [
            dataMap: dataMap
            , keys : keys
    ]
}

// # build widget tpl map
Map widgetCodeMap = buildDataFromMdFile(new File("${rootPath}/src/widget_tpl.md"), false).dataMap
widgetCodeMap.each { String key, String text ->

    text = text.replaceAll("```html", "")
    text = text.replaceAll("```", "")
    widgetCodeMap.put key, text
}

// # generate detail pages
new File("${rootPath}/src/data").eachDirRecurse { dataDir ->


    def dataFile = new File("${dataDir.absolutePath}/data.md")
    if (!dataFile.exists())
        return

    // build data
    Map result = buildDataFromMdFile(dataFile, true)
    Map dataMap = result.dataMap
    List keys = result.keys

    // replace page with data
    String pageHtml = new File("${rootPath}/tmp/page.html").text

    String replaceContent = ""


    keys.each { String key ->


        String widgetType = key.indexOf(".") >= 0 ? key.split("\\.")[0] : key

        if (widgetType == "images") {
            String widgetTpl = widgetCodeMap.get("image")
            List images = dataMap.get(key)

            images.each { String imageFileName ->

                if (imageFileName && imageFileName.trim().length() > 0) {
                    String widgetContent = widgetTpl.replaceAll(REPLACE_KEY, imageFileName)
                    replaceContent = replaceContent + widgetContent
                }
            }


        } else {

            String widgetTpl = widgetCodeMap.get(widgetType)

            if (!widgetTpl) {
                widgetTpl = widgetCodeMap.get("common")
            }


            String dataStr = dataMap.get(key)

            String widgetContent = widgetTpl.replaceAll(REPLACE_KEY, dataStr)


            replaceContent = replaceContent + widgetContent

        }

    }



    pageHtml = pageHtml.replaceAll(REPLACE_KEY, replaceContent)

    // add js and css

    def resMap = [
            BOOTSTRAP_CSS_TO_REPLACE : "<link href=\"../../../../res/css/bootstrap.min.css\" rel=\"stylesheet\">"
            , CC_CSS_TO_REPLACE      : "<link href=\"../../../../res/css/cc.css\" rel=\"stylesheet\">"
            , JQUERY_TO_REPLACE      : "<script src=\"../../../../res/js/jquery-3.3.1.min.js\"></script>"
            , BOOTSTRAP_JS_TO_REPLACE: "<script src=\"../../../../res/js/bootstrap.min.js\"></script>"
    ]

    resMap.each { key, value ->
        pageHtml = pageHtml.replaceAll(key, value)
    }

    // save complete compiled html file to docs target folder.

    String targetFolderStr = dataDir.absolutePath.replaceAll("src/data", "docs/detail")
    File targetFolder = new File(targetFolderStr)
    if (!targetFolder.exists())
        targetFolder.mkdirs()


    new File("${targetFolderStr}/i.html").newWriter().withWriter { w ->
        w << pageHtml
    }

    // copy pics

    String sourcePicDir = "${dataDir.absolutePath}/pics"
    String destinationPicDir = "${targetFolderStr}/pics"

    new AntBuilder().copy(todir: destinationPicDir) {
        fileset(dir: sourcePicDir)
    }


}

// todo cc generate list page ， category index and category list page


