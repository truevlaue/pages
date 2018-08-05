// # define working dir root
String rootPath = new File(".").getCanonicalPath()


String dataText = new File("${rootPath}/data.md").text


def dataMap = [:]


def keys = []

String key = ""
String value = ""

dataText.eachLine { line ->
    // reach a new key line
    if (line.startsWith("##")) {

        // finish before key
        if (key) {
            dataMap.put key, "${value}"
        }

        // mark new key and truncate value
        key = line.replaceAll("##", "")
        value = ""

        // remember key orders
        keys.add(key)

    } else {

        if ("images".equalsIgnoreCase(key)) {


            List images = dataMap.get("images")

            if (!images) {
                images = []
                dataMap.put "images", images
            }


            images.add(line)

        } else {
            value += line
        }
    }
}


if (!dataMap.containsKey(key))
    dataMap.put key, "${value}"



