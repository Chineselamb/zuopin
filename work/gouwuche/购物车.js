const zongjiner = document.querySelector(".zongjiner")
const jian = document.querySelectorAll(".jian")
const jia = document.querySelectorAll(".jia")
const shu = document.querySelectorAll(".shu")
const xiaoji = document.querySelectorAll(".xiaoji")
const jiage = document.querySelectorAll(".jiage")
const input = document.querySelectorAll("input")
const zong = document.querySelector(".zong")
const shanchu = document.querySelectorAll(".shanchu")
const shangpin = document.querySelectorAll(".shangpin")
let shuzi = []
let xiaojizong = []
let jiagezong = []
let zongjinerzong = 0
let zongzong = 0
function qingdian() {
    zongzong = 0
    zongjinerzong = 0
    let jishu = document.querySelectorAll(".shangpin").length
    let input2 = document.querySelectorAll("input")
    for (let a = 0; a < jishu; a++) {
         let xiaojizong1 = document.querySelectorAll(".xiaoji")
        let shuzi1 = document.querySelectorAll(".shu")
        if (input2[a + 1].checked == true) {
            zongjinerzong = zongjinerzong + Number(xiaojizong1[a].textContent.slice(1))
            zongzong = zongzong + (Number(shuzi1[a].textContent));
        }
    }
    zongjiner.textContent = "￥" + zongjinerzong
    zong.textContent = zongzong
    console.log(input[1].checked);

    for (let b = 1; b < input2.length - 1; b++){
        if (input2[b].checked != true) {
            input[input.length - 1].checked = false
            return
        } else {
            input[input.length - 1].checked = true
        }
    }
}
for (let a = 0; a < shanchu.length; a++) {
    shanchu[a].addEventListener("click", function () {
        shangpin[a].remove()
        qingdian()
    }
    )
}
for (let a = 0; a < jian.length; a++) {
    jian[a].addEventListener("click", function () {
        shuzi[a] = Number(shu[a].textContent)
        xiaojizong[a] = Number(xiaoji[a].textContent.slice(1))
        jiagezong[a] = Number(jiage[a].textContent.slice(1))
        zongzong = Number(zong.textContent)
        zongjinerzong = Number(zongjiner.textContent.slice(1))
        shuzi[a]--
        zongzong--
        if (shuzi[a] == 0) {
            console.log(1);
            input[a+1].checked = false
            input[input.length-1].checked = false
        }
        if (shuzi[a] < 0) {
            alert("不能小于0")
            return
        }

        shu[a].textContent = shuzi[a]
        xiaojizong[a] = xiaojizong[a] - jiagezong[a]
        xiaoji[a].textContent = "￥" + xiaojizong[a]
        zongjinerzong = zongjinerzong - jiagezong[a]
        qingdian()

    })
    jia[a].addEventListener("click", function () {
        shuzi[a] = Number(shu[a].textContent)
        xiaojizong[a] = Number(xiaoji[a].textContent.slice(1))
        jiagezong[a] = Number(jiage[a].textContent.slice(1))
        zongzong = Number(zong.textContent)
        zongjinerzong = Number(zongjiner.textContent.slice(1))
        shuzi[a]++
        zongzong++
        shu[a].textContent = shuzi[a]
        xiaojizong[a] = shuzi[a] * jiagezong[a]
        xiaoji[a].textContent = "￥" + xiaojizong[a]
        zongjinerzong = zongjinerzong + jiagezong[a]
        qingdian()
    })
}
for (let b = 1; b < input.length - 1; b++) {
    input[b].addEventListener("click", function () {
        zongjinerzong = Number(zongjiner.textContent.slice(1))
        xiaojizong[b] = Number(xiaoji[b - 1].textContent.slice(1))
        zongzong = Number(zong.textContent)
        shuzi[b - 1] = Number(shu[b - 1].textContent)
        qingdian()
        for (let c = 1; c < input.length - 1; c++) {
            if (input[c].checked != true) {
                input[input.length - 1].checked = false
                return
            } else {
                input[input.length - 1].checked = true
            }
        }
    })
}

input[input.length - 1].addEventListener("click", function () {
    zongzong = 0
    zongjinerzong = 0
    if (this.checked == true) {
        for (let a = 1; a < input.length - 1; a++) {
            input[a].checked = true
        }
        qingdian()
    } else {
        for (let a = 1; a < input.length - 1; a++) {
            input[a].checked = false
        }
        zong.textContent = 0
        zongjiner.textContent = "￥" + 0
    }
})

// const rows = document.querySelectorAll(".shangpin")
// console.log(rows.length);
// rows[0].remove()
// console.log(rows.length);
// console.log(rows[0].isConnected);
// console.log(document.querySelectorAll(".shangpin").length);
// 1.老数组被删除之后数组元素还在所以两次长度都是4
// 2.获取数组元素还在就返回true不在就返回falsh
// 3.重新获取是从页面抓取所以获取到了三个元素长度就为3

// document.querySelector(".jiage").addEventListener("click", function () {
//     console.log(this.textContent)
//     console.log(this.closest(".shangpin").querySelector(".shangpinmingcheng").textContent)
// })
// 1.this就是当前获取的元素
// 2.closest就是获取父级元素再通过父级元素获取子集元素

// let real = 0
// document.querySelectorAll(".shangpin").forEach(function (r) {
//     if (r.querySelector(".goxuan").checked) {
//         real += Number(r.querySelector(".xiaoji").textContent.slice(1))
//     }
// })
// real
// 1..forEach是啥我不知道
// 2.r的值我也不知道
