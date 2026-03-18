let index = 0;
let skor = 0;
let hasilDetail = [];

let soal = [
    { tanya: "Soal 1: Siapa nama panjang gwe", type: "text", jawab: ["muhammad annash ash shidiq"] },
    { tanya: "Soal 2: Merek hp gwej", type: "text", jawab: ["poco f5"] },
    { tanya: "Soal 3: Bapak jamal mempunyai 5 orang anak, namanya jokowa, jokowe, jokowu, jokowo, siapa nama anak terakhir", type: "text", jawab: ["jamal"] },
    { tanya: "Soal 4: Ponakan gwe yang ke 6 (nama panggilan aja derr)", type: "text", jawab: ["shanum","sanum"] },
    { tanya: "Soal 5: Sepatu guwe model nya apa", type: "select", pilihan: ["Nb 530","Nb 2002","Adidas adizero","Adidas evos sl"], jawab: ["nb 2002"] },
    { tanya: "Soal 6: Mbah sum dari kota manee", type: "select", pilihan: ["Sidoardo","Pati Semarang","Salatiga","Keraton jogya","Klaten","Magelang"], jawab: ["salatiga"] },
    { tanya: "Soal 7: Merk motor gwe", type: "text", jawab: ["supra gtr","honda supra gtr","honda gtr"] },
    { tanya: "Soal 8: Gwe kemarin pake baju warna apa hahahaha", type: "text", jawab: ["putih"] },
    { tanya: "Soal 9: Langsung pilih angka paporit gwe aja", type: "text", jawab: ["21"] }
];

function updateProgress() {
    let persen = (index / soal.length) * 100;
    document.getElementById("progress-bar").style.width = persen + "%";
}

function tampilSoal() {
    let s = soal[index];

    document.getElementById("soal").innerHTML = s.tanya;

    if (s.type === "text") {
        document.getElementById("jawaban").innerHTML =
            `<input type="text" id="input" placeholder="Ketik jawaban...">`;
    } else {
        let opsi = s.pilihan.map(p =>
            `<option value="${p.toLowerCase()}">${p}</option>`
        ).join("");

        document.getElementById("jawaban").innerHTML =
            `<select id="input">${opsi}</select>`;
    }

    updateProgress();
}

function nextSoal() {
    let input = document.getElementById("input").value.toLowerCase().trim();

    if (input === "") {
        alert("Jawab dulu ya 😊");
        return;
    }

    let benar = soal[index].jawab.includes(input);

    if (benar) {
        skor++;
        hasilDetail.push(`Soal ${index+1}: BENAR`);
    } else {
        hasilDetail.push(`Soal ${index+1}: SALAH`);
    }

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

    let hasilText = `🎉 Selesai!<br>Skor: ${skor}/${soal.length}<br><br>` + hasilDetail.join("<br>");

    if (skor === soal.length) {
        hasilText += `<br><br>🎁 <a href="https://google.com" target="_blank">Klik Hadiah</a>`;
    }

    document.getElementById("hasil").innerHTML = hasilText;
}

tampilSoal();