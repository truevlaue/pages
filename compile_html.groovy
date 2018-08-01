// # define working dir root
def rootPath = new File(".").getCanonicalPath()

// # timestamp
def timestamp = "built at ${new Date().format('yyyy-MM-dd HH:mm:ss')}"

// # compile basic pages
def htmlMap = [:]
new File("${rootPath}/src").eachFile { file ->
    if (!file.isDirectory()) {
        def fileName = file.getName()
        if (fileName.startsWith("_"))
            htmlMap.put fileName, file.text
    }

}


htmlMap.put "_RP_CURRENT_TIME", "${System.currentTimeMillis()}"

new File("${rootPath}/src").eachFile { file ->
    if (!file.isDirectory()) {
        def fileName = file.getName()

        if (!fileName.startsWith("_")) {
            def html = file.text

            htmlMap.each { name, text ->
                html = html.replaceAll(name, text)
            }

            html = "<!--${timestamp}-->\n\r" + html

            new File("${rootPath}/docs/${fileName}").newWriter().withWriter { w ->
                w << html
            }
        }
    }
}

// # compile js
def jsMap = [:]
new File("${rootPath}/src/js").eachFile { file ->
    if (!file.isDirectory()) {
        def fileName = file.getName()
        if (fileName.startsWith("_"))
            jsMap.put fileName, file.text
    }
}


def gameFolder = new File("${rootPath}/docs/js")
if (!gameFolder.exists())
    gameFolder.mkdir()

new File("${rootPath}/src/js").eachFile { file ->
    if (!file.isDirectory()) {
        def fileName = file.getName()

        if (!fileName.startsWith("_")) {
            def jsCode = file.text

            jsMap.each { name, text ->
                jsCode = jsCode.replaceAll("//${name}", text)
            }

            jsCode = "//${timestamp}\n\r" + jsCode

            new File("${rootPath}/docs/js/${fileName}").newWriter().withWriter { w ->
                w << jsCode
            }
        }
    }
}

// # copy resources
String sourceDir = "${rootPath}/src/res"
String destinationDir = "${rootPath}/docs/res"

new AntBuilder().copy(todir: destinationDir) {
    fileset(dir: sourceDir)
}


println "${timestamp} ended"


