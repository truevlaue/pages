// define working dir root
def rootPath = new File(".").getCanonicalPath()

// collect widgets
def map = [:]
new File("${rootPath}/src").eachFile { file ->
    if (!file.isDirectory()) {
        def fileName = file.getName()
        if (fileName.startsWith("_"))
            map.put fileName, file.text
    }

}

// compile basic pages
new File("${rootPath}/src").eachFile { file ->
    if (!file.isDirectory()) {
        def fileName = file.getName()

        if (!fileName.startsWith("_")) {
            def html = file.text

            map.each { name, text ->
                html = html.replaceAll(name, text)
            }
            new File("${rootPath}/docs/${fileName}").newWriter().withWriter { w ->
                w << html
            }
        }
    }
}

// compile js

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
            def html = file.text

            jsMap.each { name, text ->
                html = html.replaceAll("//${name}", text)
            }
            new File("${rootPath}/docs/js/${fileName}").newWriter().withWriter { w ->
                w << html
            }
        }
    }
}

// copy resources
String sourceDir = "${rootPath}/src/res"
String destinationDir = "${rootPath}/docs/res"

new AntBuilder().copy(todir: destinationDir) {
    fileset(dir: sourceDir)
}





