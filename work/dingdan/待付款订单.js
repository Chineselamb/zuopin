const input = document.querySelectorAll("input")
const zonginput = input[input.length - 1]
const jiner1 = document.querySelectorAll(".jiner1")
const caozuo1 = document.querySelectorAll(".caozuo1")
const shujuhang = document.querySelectorAll(".shujuhang")
const zongjiner = document.querySelector(".zongjiner")
const zongshu = document.querySelector(".zongshu")
const topyou = document.querySelector(".topyou")
function tojizongshu() {
    let shujihang = document.querySelectorAll(".shujuhang");
    let jiner1 = document.querySelectorAll(".jiner1");
    let shuliang1 = document.querySelectorAll(".shuliang1")
    let input = document.querySelectorAll("input")
    let zongshujiner = 0;
    let zongshu1 = 0;
    for (let a = 0; a < shujihang.length; a++) {
        if (input[a + 1].checked == false)continue
        zongshujiner = zongshujiner + Number(shuliang1[a].textContent.slice(1))
        zongshu1 = zongshu1 + Number(jiner1[a].textContent.slice(1))
    }
    zongshu.textContent = zongshujiner
    zongjiner.textContent = "￥" + zongshu1
    for (let a = 0; a < shujihang.length; a++) {
        if (input[a + 1].checked != true) {
            zonginput.checked = false
            return
        } else {
            zonginput.checked = true
        }
    }
    if (shujihang.length == 0) {
        zonginput.checked = false
    }
}
topyou.addEventListener("click", function () {
    for (let a = 1; a < input.length; a++) {
        input[a].checked = false
    }
    for (let a = 0; a < shujuhang.length; a++) {
        shujuhang[a].remove()
    }
    zongshu.textContent = 0
    zongjiner.textContent = "￥" + 0

})
zonginput.addEventListener("click", function () {
    if (this.checked == true) {
        for (let a = 1; a < input.length - 1; a++) {
            input[a].checked = true
        }
    } else {
        for (let a = 1; a < input.length - 1; a++) {
            input[a].checked = false
        }
    }
    tojizongshu()

})
document.querySelectorAll(".shujuhang").forEach(function (r) {
    r.querySelector(".caozuo1").addEventListener("click", function () {
        r.remove()
        tojizongshu()
    })
    r.querySelector("input").addEventListener("click", function () {
        tojizongshu()
    })
})




