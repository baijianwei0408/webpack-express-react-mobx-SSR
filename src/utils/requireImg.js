function requireImg(path) {

    if (typeof window === 'undefined') {
        // node环境
        return path.replace('..', '.')
    }

    // 浏览器环境
    let paths = path.split('/')
    let file = paths[paths.length - 1]
    return require('../images/' + file)

}

module.exports = requireImg;