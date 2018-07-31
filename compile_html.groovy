def rootPath = new File(".").getCanonicalPath()

def map = [:]

new File("${rootPath}/pages").eachFile { file ->
    if (!file.isDirectory()) {
        def fileName = file.getName()
        if (fileName.startsWith("_"))
            map.put fileName, file.text
    }

}

new File("${rootPath}/pages").eachFile { file ->
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



String sourceDir = "${rootPath}/pages/res"
String destinationDir = "${rootPath}/docs/res"
new AntBuilder().copy(todir: destinationDir) {
    fileset(dir: sourceDir)
}





