def rootPath = new File(".").getCanonicalPath()

def map = [:]

new File("${rootPath}/src/widgets").eachFile { file ->
    def fileName = file.getName()
    map.put fileName, file.text
}


new File("${rootPath}/src/pages").eachFile { file ->
    def fileName = file.getName()

    def html = file.text

    map.each { name, text ->
        html = html.replaceAll(name, text)
    }
    new File("${rootPath}/docs/${fileName}") << html

}
