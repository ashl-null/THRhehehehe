let index = 0;
let skor = 0;
let hasilDetail = [];
let jawabanUser = [];
let jawabanDipilih = "";

let soal = [
    { tanya: "Soal 1: Siapa nama panjang gwe", type: "text", jawab: ["muhammad annash ash shidiq"] },
    { tanya: "Soal 2: Merek hp gwej", type: "text", jawab: ["poco f5"] },
    { tanya: "Soal 3: Bapak jamal mempunyai 5 orang anak, namanya jokowa, jokowe, jokowu, jokowo, siapa nama anak terakhir", type: "text", jawab: ["jamal"] },
    { tanya: "Soal 4: Ponakan gwe yang ke 6 (nama panggilan aja derr)", type: "text", jawab: ["shanum","sanum"] },

    {
        tanya: "Soal 5: Berapa nilai sidang gwe",
        type: "select",
        pilihan: ["A+","A","A-","B+","B","B-","C"],
        jawab: ["b+"]
    },

    { tanya: "Soal 6: Mbah sum dari kota manee", type: "select", pilihan: ["Sidoardo","Pati Semarang","Salatiga","Keraton jogya","Klaten","Magelang"], jawab: ["salatiga"] },
    { tanya: "Soal 7: Merk motor gwe", type: "text", jawab: ["supra gtr","honda supra gtr","honda gtr"] },
    { tanya: "Soal 8: Gwe kemarin pake baju warna apa hahahaha", type: "text", jawab: ["putih"] },
    { tanya: "Soal 9: Langsung pilih angka paporit gwe aja", type: "text", jawab: ["21"] }
];

function updateProgress() {
    document.getElementById("progress-bar").style.width =
        (index / soal.length * 100) + "%";
}

function tampilSoal() {
    let s = soal[index];

    document.getElementById("soal").className = "bubble warna" + (index + 1);
    document.getElementById("soal").innerHTML = s.tanya;

    document.getElementById("progress-text").innerHTML =
        `Soal ${index+1} dari ${soal.length}`;

    if (s.type === "text") {
        document.getElementById("jawaban").innerHTML =
            `<input type="text" id="input" placeholder="Ketik jawaban...">`;
    } else {
        let opsi = s.pilihan.map(p => `
            <button class="opsi-btn" onclick="pilihJawaban('${p.toLowerCase()}', this)">
                ${p}
            </button>
        `).join("");

        document.getElementById("jawaban").innerHTML =
            `<div class="opsi-container">${opsi}</div>`;
    }

    jawabanDipilih = "";
    updateProgress();
}

function pilihJawaban(value, el) {
    jawabanDipilih = value;

    document.querySelectorAll(".opsi-btn")
        .forEach(btn => btn.classList.remove("aktif"));

    el.classList.add("aktif");
}

function nextSoal() {
    let input;

    if (soal[index].type === "text") {
        input = document.getElementById("input").value.toLowerCase().trim();
    } else {
        input = jawabanDipilih;
    }

    if (!input) {
        alert("Jawab dulu 😁");
        return;
    }

    jawabanUser.push(input);

    let benar = soal[index].jawab.includes(input);

    hasilDetail.push(benar ? "BENAR" : "SALAH");
    if (benar) skor++;

    index++;

    if (index < soal.length) {
        tampilSoal();
    } else {
        tampilHasil();
    }
}

function tampilHasil() {
    document.querySelector(".chat-box").style.display = "none";
    document.getElementById("progress-bar").style.width = "100%";

    let html = `<h3>🎉 Selesai!</h3><p>Skor: ${skor}/${soal.length}</p>`;

    if (skor === soal.length) html += `🔥 Aowkaoakowka hebat kamu bang 😎`;
    else if (skor > 7) html += `:v nyaris, dikit lagi 😏`;
    else if (skor > 4) html += `😂 Aowkaokwka lolok`;
    else html += `💀 Loloookkkkkkkk 😭`;

    html += `<hr><h4>❌ Jawaban salah:</h4>`;

    soal.forEach((s, i) => {
        if (hasilDetail[i] === "SALAH") {
            html += `
                <div class="hasil-card">
                    <b>${s.tanya}</b><br>
                    ❌ ${jawabanUser[i]}
                </div>`;
        }
    });

    if (skor === soal.length) {
        html += `<br><a href="https://link.dana.id/danakaget?c=ssswlh9kr&r=bywqFE&orderId=20260319101214505215010300166680870334424">🎁 Ambil Hadiah</a>`;
    }

    document.getElementById("hasil").innerHTML = html;
}

tampilSoal();