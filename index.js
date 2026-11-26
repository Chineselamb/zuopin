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
        for (let i = 0; i < pts.length; i++) {
            const p = pts[i]
            p.x += p.vx
            p.y += p.vy
            if (p.x < 0 || p.x > cvs.width) p.vx *= -1
            if (p.y < 0 || p.y > cvs.height) p.vy *= -1
            ctx.beginPath()
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
            ctx.fillStyle = "rgba(170,200,255,.5)"
            ctx.fill()
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
    const base = [
        "translate3d(0,0,60px)",
        "translate3d(-72px,20px,0) rotate(-7deg)",
        "translate3d(72px,34px,-80px) rotate(7deg)"
    ]

    stack.addEventListener("mousemove", function (e) {
        const r = stack.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width - .5
        const py = (e.clientY - r.top) / r.height - .5
        cards.forEach(function (c) {
            const d = Number(c.dataset.depth)
            const k = 1 - d * .28
            c.style.transition = "transform .1s linear"
            c.style.transform = base[d] +
                " rotateY(" + (px * 16 * k) + "deg) rotateX(" + (-py * 16 * k) + "deg)"
        })
    })

    stack.addEventListener("mouseleave", function () {
        cards.forEach(function (c) {
            c.style.transition = "transform .6s cubic-bezier(.2,.75,.2,1)"
            c.style.transform = base[Number(c.dataset.depth)]
        })
    })
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

    window.scrollTo({ top: 0, behavior: "auto" })
    updateBar()
}

tabs.forEach(function (t) {
    t.addEventListener("click", function () { go(t.dataset.page) })
})

document.querySelectorAll("[data-goto]").forEach(function (b) {
    b.addEventListener("click", function () { go(b.dataset.goto) })
})

addEventListener("keydown", function (e) {
    const ids = ["p1", "p2", "p3"]
    const now = ids.findIndex(function (id) { return document.getElementById(id).classList.contains("active") })
    if (e.key === "ArrowRight" && now < 2) go(ids[now + 1])
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
    if (w.indexOf("几门") >= 0 || w.indexOf("多少门") >= 0 || w.indexOf("几节") >= 0) {
        huida.textContent = `我一共安排了 ${kecheng.length} 门课。`
        return
    }

    let zhou = -1
    for (let i = 0; i < ZHOU.length; i++) {
        if (w.indexOf(ZHOU[i]) >= 0) { zhou = i; break }
    }

    const jie = w.match(/第([1-6])节/)
    if (zhou >= 0 && jie) {
        const n = Number(jie[1])
        const k = kecheng.find(function (x) { return x.xingqi === zhou + 1 && x.jieci === n })
        huida.textContent = k
            ? `${ZHOU[zhou]}第${n}节：${k.mingzi}，${k.laoshi}老师，在 ${k.jiaoshi}。`
            : `${ZHOU[zhou]}第${n}节没有课。`
        return
    }

    if (zhou >= 0) {
        const list = kecheng.filter(function (x) { return x.xingqi === zhou + 1 })
        if (!list.length) { huida.textContent = `${ZHOU[zhou]}没有课。`; return }
        huida.textContent = `${ZHOU[zhou]}有 ${list.length} 门课：` + list.map(function (k) {
            return `${k.mingzi}（第${k.jieci}节，${k.jiaoshi}）`
        }).join("、")
        return
    }

    const zhao = kecheng.filter(function (k) { return w.indexOf(k.mingzi) >= 0 })
    if (zhao.length) {
        huida.textContent = zhao.map(function (k) {
            return `${k.mingzi}在 ${k.jiaoshi}，${ZHOU[k.xingqi - 1]}第${k.jieci}节，${k.laoshi}老师。`
        }).join("\n")
        return
    }

    huida.textContent = "没听懂。可以问：周一有什么课 / 一共几门课 / 体育课在哪上。"
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
    if (e.key === "Enter") fasong.click()
})

document.querySelectorAll(".chip").forEach(function (c) {
    c.addEventListener("click", function () {
        wenti.value = c.textContent
        fasong.click()
    })
})

/* ---------- 启动 ---------- */

xuanranLunbo()
kaishi()
observe(document)
updateBar()

// 首屏标题立刻解码
document.querySelectorAll("#p1 [data-decode]").forEach(function (h) {
    h.dataset.played = "1"
    jiemai(h)
})
