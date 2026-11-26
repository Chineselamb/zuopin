/* =========================================================
   张欣阳 / Portfolio 2026
   原生 JS，无任何库
   ① 粒子背景 ② 光标 ③ 3D 卡片堆 ④ 文字解码
   ⑤ 滚动出现/数字 ⑥ 页面切换与进度条 ⑦ 轮播 ⑧ 课表 / 助手
   ========================================================= */

/* ---------- 数据 ---------- */

const huandengpian = [
    { biaoti: "从零到上线", fubiao: "TWO MONTHS / NO FRAMEWORK", yanse: "s1" },
    { biaoti: "数据驱动", fubiao: "ARRAY IS THE TRUTH", yanse: "s2" },
    { biaoti: "能用的应用", fubiao: "ADD / DELETE / PERSIST", yanse: "s3" },
    { biaoti: "下一步：理解", fubiao: "CONNECT A REAL MODEL", yanse: "s4" }
]

const kecheng = [
    { mingzi: "高数", laoshi: "王建国", jiaoshi: "A301", xingqi: 1, jieci: 1 },
    { mingzi: "英语", laoshi: "李梅", jiaoshi: "B202", xingqi: 1, jieci: 3 },
    { mingzi: "体育", laoshi: "张强", jiaoshi: "操场", xingqi: 1, jieci: 5 },
    { mingzi: "C语言", laoshi: "陈磊", jiaoshi: "C105", xingqi: 2, jieci: 1 },
    { mingzi: "HTML5", laoshi: "刘洋", jiaoshi: "C208", xingqi: 2, jieci: 3 },
    { mingzi: "高数", laoshi: "王建国", jiaoshi: "A301", xingqi: 3, jieci: 1 },
    { mingzi: "JavaScript", laoshi: "刘洋", jiaoshi: "C208", xingqi: 3, jieci: 3 },
    { mingzi: "英语", laoshi: "李梅", jiaoshi: "B202", xingqi: 4, jieci: 1 },
    { mingzi: "数据库", laoshi: "赵敏", jiaoshi: "C301", xingqi: 4, jieci: 5 },
    { mingzi: "移动应用开发", laoshi: "刘洋", jiaoshi: "C208", xingqi: 5, jieci: 3 },
    { mingzi: "就业指导", laoshi: "孙丽", jiaoshi: "报告厅", xingqi: 5, jieci: 5 }
]

/* ---------- 元素 ---------- */

const track = document.querySelector(".track")
const diandianbox = document.querySelector(".diandian")
const zuo = document.querySelector(".zuo")
const you = document.querySelector(".you")
const wenti = document.getElementById("wenti")
const fasong = document.getElementById("fasong")
const huida = document.getElementById("huida")

/* ---------- ① 粒子背景 ---------- */

var mouseX = null, mouseY = null
addEventListener("mousemove", function (e) { mouseX = e.clientX; mouseY = e.clientY })

;(function lizi() {
    const cvs = document.getElementById("xingxing")
    const ctx = cvs.getContext("2d")
    let pts = []

    function size() {
        cvs.width = innerWidth
        cvs.height = innerHeight
        const n = Math.min(80, Math.floor(innerWidth / 14))
        pts = []
        for (let i = 0; i < n; i++) {
            pts.push({
                x: Math.random() * cvs.width,
                y: Math.random() * cvs.height,
                r: Math.random() * 1.4 + .3,
                vx: (Math.random() - .5) * .22,
                vy: (Math.random() - .5) * .22
            })
        }
    }

    function draw() {
        ctx.clearRect(0, 0, cvs.width, cvs.height)
        // 先画点（鼠标附近的点会被轻轻推开）
        for (let i = 0; i < pts.length; i++) {
            const p = pts[i]
            if (typeof mouseX === "number") {
                const dx = p.x - mouseX, dy = p.y - mouseY
                const d2 = dx * dx + dy * dy
                if (d2 < 24000 && d2 > 1) {
                    const f = (1 - d2 / 24000) * 0.9
                    p.x += (dx / Math.sqrt(d2)) * f
                    p.y += (dy / Math.sqrt(d2)) * f
                }
            }
            p.x += p.vx
            p.y += p.vy
            if (p.x < 0 || p.x > cvs.width) p.vx *= -1
            if (p.y < 0 || p.y > cvs.height) p.vy *= -1
            ctx.beginPath()
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
            ctx.fillStyle = "rgba(170,200,255,.5)"
            ctx.fill()
        }
        // 再画近邻连线：距离越近越亮
        const MAX = 128
        for (let i = 0; i < pts.length; i++) {
            for (let k = i + 1; k < pts.length; k++) {
                const dx = pts[i].x - pts[k].x
                const dy = pts[i].y - pts[k].y
                const d = Math.sqrt(dx * dx + dy * dy)
                if (d > MAX) continue
                ctx.beginPath()
                ctx.moveTo(pts[i].x, pts[i].y)
                ctx.lineTo(pts[k].x, pts[k].y)
                ctx.strokeStyle = "rgba(140,180,255," + ((1 - d / MAX) * 0.28) + ")"
                ctx.lineWidth = 0.7
                ctx.stroke()
            }
        }
        requestAnimationFrame(draw)
    }

    size()
    draw()
    addEventListener("resize", size)
})()



/* ---------- ② 光标：光晕 + 点 ---------- */

;(function guangbiao() {
    const glow = document.getElementById("cursorGlow")
    const dot = document.getElementById("cursorDot")
    if (!glow || !dot) return
    let mx = innerWidth / 2, my = innerHeight / 2
    let gx = mx, gy = my, dx = mx, dy = my

    addEventListener("mousemove", function (e) { mx = e.clientX; my = e.clientY })

    ;(function loop() {
        gx += (mx - gx) * .09
        gy += (my - gy) * .09
        dx += (mx - dx) * .35
        dy += (my - dy) * .35
        glow.style.transform = "translate(" + gx + "px," + gy + "px)"
        dot.style.transform = "translate(" + dx + "px," + dy + "px)"
        requestAnimationFrame(loop)
    })()
})()

/* ---------- ③ 3D 卡片堆 ---------- */

;(function katui() {
    const stack = document.getElementById("stack")
    if (!stack) return
    const cards = [].slice.call(stack.querySelectorAll(".gcard"))

    // 收起时（默认叠放）
    const CLOSED = [
        "translate3d(0,0,60px)",
        "translate3d(-72px,20px,0) rotate(-7deg)",
        "translate3d(72px,34px,-80px) rotate(7deg)"
    ]

    // 展开时（三张散开）
    const OPEN = [
        "translate3d(0,-16px,110px) rotate(0deg)",
        "translate3d(-118px,8px,10px) rotate(-11deg)",
        "translate3d(118px,22px,-20px) rotate(11deg)"
    ]

    let opened = false

    function setBase(base) {
        cards.forEach(function (c) {
            const d = Number(c.dataset.depth)
            c.style.transition = "transform .55s cubic-bezier(.2,.75,.2,1)"
            c.style.transform = base[d]
            c.style.opacity = opened ? (d === 0 ? 1 : .9) : ""
        })
    }

    function tilt(e) {
        const r = stack.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width - .5
        const py = (e.clientY - r.top) / r.height - .5
        const base = opened ? OPEN : CLOSED
        cards.forEach(function (c) {
            const d = Number(c.dataset.depth)
            const k = 1 - d * .28
            c.style.transition = "transform .12s linear"
            c.style.transform = base[d] +
                " rotateY(" + (px * 14 * k) + "deg) rotateX(" + (-py * 14 * k) + "deg)"
        })
    }

    stack.addEventListener("mouseenter", function () {
        opened = true
        setBase(OPEN)
    })

    stack.addEventListener("mousemove", tilt)

    stack.addEventListener("mouseleave", function () {
        opened = false
        setBase(CLOSED)
        cards.forEach(function (c) { c.style.opacity = "" })
    })

    // 触屏：点一下展开，再点收起
    stack.addEventListener("touchstart", function () {
        opened = !opened
        setBase(opened ? OPEN : CLOSED)
    }, { passive: true })
})()

/* ---------- ④ 文字解码 ---------- */

function jiemai(el) {
    const final = el.textContent
    const pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@%&*+-=<>"
    let step = 0
    el.classList.add("decode")
    const timer = setInterval(function () {
        step += 1.1
        let out = ""
        for (let i = 0; i < final.length; i++) {
            if (i < step) out += final[i]
            else if (i < step + 3) out += pool[Math.floor(Math.random() * pool.length)]
            else out += " "
        }
        el.textContent = out
        if (step >= final.length) {
            clearInterval(timer)
            el.textContent = final
            el.classList.remove("decode")
        }
    }, 26)
}

/* ---------- ⑤ 滚动出现 + 数字 ---------- */

function shuzi(box) {
    if (box.dataset.done) return
    box.dataset.done = "1"
    box.querySelectorAll(".n").forEach(function (n) {
        const target = Number(n.dataset.n)
        if (!target) { n.textContent = "0"; return }
        let v = 0
        const step = Math.max(1, Math.round(target / 32))
        const t = setInterval(function () {
            v += step
            if (v >= target) { v = target; clearInterval(t) }
            n.textContent = v
        }, 24)
    })
}

const ob = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
        if (!e.isIntersecting) return
        e.target.classList.add("on")
        ob.unobserve(e.target)
        if (e.target.classList.contains("band")) shuzi(e.target)
    })
}, { threshold: .1 })

function observe(root) {
    root.querySelectorAll(".reveal").forEach(function (el) { ob.observe(el) })
}

/* ---------- ⑥ 页面切换 + 进度条 ---------- */

const tabs = document.querySelectorAll(".tab")
const scenes = document.querySelectorAll(".scene")
const bar = document.getElementById("progressBar")

function go(id) {
    scenes.forEach(function (s) { s.classList.toggle("active", s.id === id) })
    tabs.forEach(function (t) { t.classList.toggle("active", t.dataset.page === id) })

    const scene = document.getElementById(id)
    scene.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("on") })
    if (scene.querySelector(".band")) shuzi(scene.querySelector(".band"))

    // 标题解码
    scene.querySelectorAll("[data-decode]").forEach(function (h) {
        if (!h.dataset.played) {
            h.dataset.played = "1"
            jiemai(h)
        }
    })

    document.documentElement.style.scrollBehavior = "auto"
    window.scrollTo(0, 0)
    document.documentElement.style.scrollBehavior = ""
    updateBar()
    document.dispatchEvent(new Event("scenechange"))
}

tabs.forEach(function (t) {
    t.addEventListener("click", function () { go(t.dataset.page) })
})

document.querySelectorAll("[data-goto]").forEach(function (b) {
    b.addEventListener("click", function () { go(b.dataset.goto) })
})

addEventListener("keydown", function (e) {
    const el = document.activeElement
    if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)) return
    const ids = ["p0", "p1", "p2", "p3"]
    const now = ids.findIndex(function (id) { return document.getElementById(id).classList.contains("active") })
    if (e.key === "ArrowRight" && now < ids.length - 1) go(ids[now + 1])
    if (e.key === "ArrowLeft" && now > 0) go(ids[now - 1])
})

function updateBar() {
    const h = document.documentElement.scrollHeight - innerHeight
    const p = h > 0 ? Math.min(1, scrollY / h) : 0
    bar.style.width = (p * 100) + "%"
}

addEventListener("scroll", updateBar, { passive: true })
addEventListener("resize", updateBar)

/* ---------- ⑦ 轮播 ---------- */

let dangqian = 0
let jishiqi = null

function xuanranLunbo() {
    track.innerHTML = huandengpian.map(function (d) {
        return `<div class="slide ${d.yanse}">${d.biaoti}<small>${d.fubiao}</small></div>`
    }).join("")

    diandianbox.innerHTML = huandengpian.map(function (d, i) {
        return `<div class="dian ${i === dangqian ? "active" : ""}" data-i="${i}"></div>`
    }).join("")

    track.style.transform = `translateX(-${dangqian * 100}%)`
}

function xiayizhang() {
    dangqian = (dangqian + 1) % huandengpian.length
    xuanranLunbo()
}

function kaishi() {
    clearInterval(jishiqi)
    jishiqi = setInterval(xiayizhang, 3000)
}

/* ---------- ⑧ 迷你课表 + 助手 ---------- */

;(function xiaokebiao() {
    const body = document.querySelector(".xk-body")
    if (!body) return
    const hang = ["一二", "三四", "五六"]
    const html = []

    for (let r = 0; r < 3; r++) {
        const jieci = r * 2 + 1
        html.push(`<div class="xk-cell">${hang[r]}</div>`)
        for (let d = 1; d <= 5; d++) {
            const k = kecheng.find(function (x) { return x.xingqi === d && x.jieci === jieci })
            html.push(k
                ? `<div class="xk-cell ke" title="${k.laoshi} · ${k.jiaoshi}">${k.mingzi}</div>`
                : `<div class="xk-cell"></div>`)
        }
    }

    body.innerHTML = html.join("")

    body.addEventListener("click", function (e) {
        const ke = e.target.closest(".ke")
        if (!ke) return
        ke.style.outline = ke.style.outline ? "" : "2px solid #9fc4ff"
    })
})()

const ZHOU = ["周一", "周二", "周三", "周四", "周五"]

function huidawenti(w) {
    const jieM = w.match(/第([1-6])节/)
    const jie = jieM ? Number(jieM[1]) : null

    let zhou = -1
    for (let i = 0; i < ZHOU.length; i++) {
        if (w.indexOf(ZHOU[i]) >= 0) { zhou = i; break }
    }

    // 问句里提到的课程名（去重）
    const names = []
    kecheng.forEach(function (k) {
        if (w.indexOf(k.mingzi) >= 0 && names.indexOf(k.mingzi) < 0) names.push(k.mingzi)
    })

    // ① 课程名 + 问第几节 / 什么时候
    if (names.length && /第几节|几节|什么时候|哪天|周几/.test(w)) {
        const list = kecheng.filter(function (k) { return names.indexOf(k.mingzi) >= 0 })
        huida.textContent = list.map(function (k) {
            return k.mingzi + "：" + ZHOU[k.xingqi - 1] + "第" + k.jieci + "节，" + k.jiaoshi
        }).join("\n")
        return
    }

    // ② 只问总门数
    if (/几门|多少门/.test(w)) {
        const men = []
        kecheng.forEach(function (k) { if (men.indexOf(k.mingzi) < 0) men.push(k.mingzi) })
        huida.textContent = "一共 " + men.length + " 门课，排了 " + kecheng.length + " 节课。"
        return
    }

    // ③ 周几 + 第几节
    if (zhou >= 0 && jie) {
        const k = kecheng.find(function (x) { return x.xingqi === zhou + 1 && x.jieci === jie })
        huida.textContent = k
            ? ZHOU[zhou] + "第" + jie + "节：" + k.mingzi + "，" + k.laoshi + "老师，在 " + k.jiaoshi + "。"
            : ZHOU[zhou] + "第" + jie + "节没有课。"
        return
    }

    // ④ 只问第几节
    if (jie) {
        const list = kecheng.filter(function (k) { return k.jieci === jie })
        huida.textContent = list.length
            ? "第" + jie + "节有 " + list.length + " 门课：" + list.map(function (k) {
                return k.mingzi + "（" + ZHOU[k.xingqi - 1] + "，" + k.jiaoshi + "）"
            }).join("、")
            : "第" + jie + "节没有课。"
        return
    }

    // ⑤ 只问周几
    if (zhou >= 0) {
        const list = kecheng.filter(function (k) { return k.xingqi === zhou + 1 })
        if (!list.length) { huida.textContent = ZHOU[zhou] + "没有课。"; return }
        huida.textContent = ZHOU[zhou] + "有 " + list.length + " 门课：" + list.map(function (k) {
            return k.mingzi + "（第" + k.jieci + "节，" + k.jiaoshi + "）"
        }).join("、")
        return
    }

    // ⑥ 只提到课程名
    if (names.length) {
        const list = kecheng.filter(function (k) { return names.indexOf(k.mingzi) >= 0 })
        huida.textContent = list.map(function (k) {
            return k.mingzi + "在 " + k.jiaoshi + "，" + ZHOU[k.xingqi - 1] + "第" + k.jieci + "节。"
        }).join("\n")
        return
    }

    huida.textContent = "没听懂。可以问：周一有什么课 / 一共几门课 / 体育课第几节 / 第3节有什么课。"
}

/* ---------- 绑定 ---------- */

you.addEventListener("click", function () { xiayizhang(); kaishi() })

zuo.addEventListener("click", function () {
    dangqian = (dangqian - 1 + huandengpian.length) % huandengpian.length
    xuanranLunbo()
    kaishi()
})

diandianbox.addEventListener("click", function (e) {
    const d = e.target.closest(".dian")
    if (!d) return
    dangqian = Number(d.dataset.i)
    xuanranLunbo()
    kaishi()
})

fasong.addEventListener("click", function () {
    const w = wenti.value.trim()
    if (!w) return
    huidawenti(w)
})

wenti.addEventListener("keydown", function (e) {
    if (e.isComposing || e.keyCode === 229) return
    if (e.key === "Enter") { e.preventDefault(); fasong.click() }
})

document.querySelectorAll(".chip").forEach(function (c) {
    c.addEventListener("click", function () {
        wenti.value = c.textContent
        fasong.click()
    })
})

/* ---------- ⑩ 代码打字机 ---------- */

;(function dazima() {
    const el = document.getElementById("typerCode")
    if (!el) return

    const src = [
        ["c", "// 监听器只绑在容器上，只绑一次"],
        ["", "kapianzubox.addEventListener(\"click\", function (e) {"],
        ["", "  const hang = e.target.closest(\".hang\")"],
        ["c", "  // 点到了表头或空白处"],
        ["", "  if (!hang) return"],
        ["c", "  // 把「点了哪一行」翻译成数组下标"],
        ["", "  const c = Array.from(document.querySelectorAll(\".hang\")).indexOf(hang)"],
        ["c", "  // 勾选框：改这一条数据"],
        ["", "  if (e.target.closest(\"input\")) {"],
        ["", "    dingdan[c].gou = e.target.closest(\"input\").checked"],
        ["", "  }"],
        ["c", "  // 取消：从数组里删掉这一条"],
        ["", "  if (e.target.closest(\".caozuo1\")) {"],
        ["", "    dingdan.splice(c, 1)"],
        ["", "  }"],
        ["c", "  // 数据变了，重画"],
        ["", "  xuanran()"],
        ["", "})"]
    ]

    let started = false

    function start() {
        if (started) return
        started = true
        let line = 0, ch = 0
        const out = []

        function step() {
            if (line >= src.length) { el.innerHTML = colorize(out.join("\n")); return }
            const [type, text] = src[line]
            ch++
            const cur = text.slice(0, ch)
            out[line] = type === "c" ? cur : cur
            el.innerHTML = colorize(out.join("\n")) + '<span class="caret-blink"></span>'
            if (ch >= text.length) { line++; ch = 0; }
            setTimeout(step, 12)
        }
        step()
    }

    // 简单着色：注释整行变灰，引号内变绿
    function colorize(t) {
        return t.split("\n").map(function (l) {
            const esc = l.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
            if (esc.trim().indexOf("//") === 0) return '<span class="c">' + esc + "</span>"
            return esc.replace(/("[^"]*")/g, '<span class="s">$1</span>')
        }).join("\n")
    }

    const ob2 = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { start(); ob2.disconnect() } })
    }, { threshold: .25 })

    ob2.observe(el)
})()

/* ---------- ⑪ 交互升级：卡片光斑 / 磁性按钮 / 光标状态 ---------- */

;(function hujiao() {
    // 卡片：光斑跟随鼠标
    document.querySelectorAll(".work, .pit, .console, .case, .codewin, .col, .ver, .doubt").forEach(function (el) {
        el.classList.add("spot")
        el.addEventListener("mousemove", function (e) {
            const r = el.getBoundingClientRect()
            el.style.setProperty("--mx", (e.clientX - r.left) + "px")
            el.style.setProperty("--my", (e.clientY - r.top) + "px")
        })
    })

    // 按钮：磁性吸附
    document.querySelectorAll(".btn, .pager-btn, .tab, .chip").forEach(function (b) {
        b.classList.add("magnet")
        b.addEventListener("mousemove", function (e) {
            const r = b.getBoundingClientRect()
            const x = (e.clientX - r.left - r.width / 2) / r.width
            const y = (e.clientY - r.top - r.height / 2) / r.height
            b.style.transform = "translate(" + (x * 8) + "px," + (y * 6 - 1) + "px)"
        })
        b.addEventListener("mouseleave", function () { b.style.transform = "" })
    })

    // 光标：悬停可点元素时放大
    const dot = document.getElementById("cursorDot")
    if (dot) {
        document.querySelectorAll("a, button, .chip, .dian, .xk-cell.ke").forEach(function (el) {
            el.addEventListener("mouseenter", function () { dot.classList.add("grow") })
            el.addEventListener("mouseleave", function () { dot.classList.remove("grow") })
        })
    }
})()

/* 切页后重新为新区块绑定光斑 */
document.addEventListener("scenechange", function () {
    document.querySelectorAll(".spot:not([data-bound])").forEach(function (el) {
        el.dataset.bound = "1"
    })
})

/* ---------- ⑬ 动效增强：指示条 / 倾斜 / 视差 / 交错入场 ---------- */

;(function dongxiao() {
    /* 1. 导航指示条 */
    const nav = document.querySelector(".nav")
    const tabs = [].slice.call(document.querySelectorAll(".tab"))
    let ind = null

    if (nav && tabs.length) {
        ind = document.createElement("span")
        ind.className = "tab-ind"
        nav.appendChild(ind)

        function moveInd() {
            const act = document.querySelector(".tab.active")
            if (!act) return
            const r = act.getBoundingClientRect()
            const pr = nav.getBoundingClientRect()
            ind.style.width = r.width + "px"
            ind.style.transform = "translateX(" + (r.left - pr.left) + "px)"
        }

        moveInd()
        addEventListener("resize", moveInd)
        tabs.forEach(function (t) { t.addEventListener("click", function () { setTimeout(moveInd, 30) }) })
        document.addEventListener("scenechange", function () { setTimeout(moveInd, 30) })
    }

    /* 2. 卡片 3D 倾斜 */
    function bindTilt() {
        document.querySelectorAll(".work, .pit, .codewin, .console").forEach(function (el) {
            if (el.dataset.tilt) return
            el.dataset.tilt = "1"
            el.classList.add("tiltcard")
            el.addEventListener("mousemove", function (e) {
                const r = el.getBoundingClientRect()
                const px = (e.clientX - r.left) / r.width - .5
                const py = (e.clientY - r.top) / r.height - .5
                el.style.transform = "perspective(900px) rotateY(" + (px * 4) + "deg) rotateX(" + (-py * 4) + "deg) translateY(-2px)"
            })
            el.addEventListener("mouseleave", function () { el.style.transform = "" })
        })
    }

    /* 3. 视差 */
    const px = [].slice.call(document.querySelectorAll(".hero-stack, .hero-copy, .codewin, .band"))
    px.forEach(function (el) { el.classList.add("parallax") })

    function parallax() {
        const h = innerHeight
        px.forEach(function (el) {
            const r = el.getBoundingClientRect()
            if (r.bottom < -200 || r.top > h + 200) return
            const center = r.top + r.height / 2 - h / 2
            el.style.transform = "translateY(" + (center * -0.045) + "px)"
        })
    }

    /* 4. 交错入场：同组元素依次出现 */
    function stagger(root) {
        root.querySelectorAll(".sec, .hero, .band, .pits, .versions, .plan, .doubt-list, .cols").forEach(function (group) {
            const kids = group.querySelectorAll(":scope > .reveal")
            kids.forEach(function (el, i) {
                el.style.transitionDelay = Math.min(i * 70, 280) + "ms"
            })
        })
    }

    addEventListener("scroll", parallax, { passive: true })
    addEventListener("resize", parallax)

    bindTilt()
    stagger(document)
    parallax()

    document.addEventListener("scenechange", function () {
        bindTilt()
        stagger(document)
        parallax()
    })
})()

/* ---------- ⑭ 开场页：HUD + 打字 ---------- */

;(function kaichang() {
    const xy = document.getElementById("hudXY")
    const fps = document.getElementById("hudFPS")

    if (xy) {
        let mx = 0, my = 0, last = performance.now(), frames = 0, f = 60
        addEventListener("mousemove", function (e) {
            mx = e.clientX; my = e.clientY
            xy.textContent = "X " + (mx >= 0 ? "+" : "") + mx + "  Y " + (my >= 0 ? "+" : "") + my
        })
        ;(function tick(now) {
            frames++
            if (now - last >= 500) {
                f = Math.round(frames * 1000 / (now - last))
                frames = 0
                last = now
                if (fps) fps.textContent = f + " FPS"
            }
            requestAnimationFrame(tick)
        })(performance.now())
    }

    const el = document.getElementById("p0type")
    if (!el) return
    const text = "需求 → 约束 → 生成 → 验收 → 成品"
    let i = 0
    function type() {
        el.textContent = text.slice(0, ++i)
        if (i < text.length) setTimeout(type, 70)
        else setTimeout(function () { i = 0; type() }, 3200)
    }
    setTimeout(type, 500)
})()

/* ---------- 启动 ---------- */

xuanranLunbo()
kaishi()
observe(document)

// 首屏兜底：不依赖观察器，直接显示
;(function showFirst() {
    const act = document.querySelector(".scene.active")
    if (act) act.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("on") })
})()
updateBar()

// 首屏标题立刻解码
document.querySelectorAll("#p1 [data-decode]").forEach(function (h) {
    h.dataset.played = "1"
    jiemai(h)
})
