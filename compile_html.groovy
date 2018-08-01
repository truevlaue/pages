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

// compile games specified pages
//def gameFolder = new File("${rootPath}/docs/games")
//if (!gameFolder.exists())
//    gameFolder.mkdir()
//
//new File("${rootPath}/pages/games").eachFile { file ->
//    if (!file.isDirectory()) {
//        def fileName = file.getName()
//
//        if (!fileName.startsWith("_")) {
//            def html = file.text
//
//            map.each { name, text ->
//                html = html.replaceAll(name, text)
//            }
//            new File("${rootPath}/docs/games/${fileName}").newWriter().withWriter { w ->
//                w << html
//            }
//        }
//    }
//}

// copy resources
String sourceDir = "${rootPath}/pages/res"
String destinationDir = "${rootPath}/docs/res"
new AntBuilder().copy(todir: destinationDir) {
    fileset(dir: sourceDir)
}





