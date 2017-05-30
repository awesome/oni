const Q = require("q")
const path = require("path")

const activate = (Oni) => {
    const React = Oni.dependencies.React

    const filePathItem = Oni.statusBar.createItem(0, -1)
    const lineNumberItem = Oni.statusBar.createItem(1, -1)
    const modeItem = Oni.statusBar.createItem(1, -2)

    const setMode = (mode) => {
        // modeItem.setContents(mode)
    }

    const setLineNumber = (line, column) => {
        // lineNumberItem.setContents(`${line}, ${column}`)

        const element = React.createElement("div", null, `${line}, ${column}`)
        lineNumberItem.setContents(element)
    }

    const setFilePath = (filePath) => {
        let filePathString = filePath
        if (!filePathString) {
            filePathString = "[No Name]"
        }

        const element = React.createElement("div", { style: { color: "rgb(140, 140, 140)" } }, filePathString)

        filePathItem.setContents(element)
    }

    Oni.on("mode-changed", (evt) => {
        setMode(evt)
    })

    Oni.on("cursor-moved", (evt) => {
        setLineNumber(evt.line, evt.column)
    })

    Oni.on("buffer-enter", (evt) => {
        setFilePath(evt.bufferFullPath)
    })

    setMode("n")
    setLineNumber(1, 1)
    setFilePath(null)

    modeItem.show()
    lineNumberItem.show()
    filePathItem.show()
}

module.exports = {
    activate
}
