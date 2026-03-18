let index = 0;
let skor = 0;
let hasilDetail = [];
let jawabanUser = [];

let soal = [
    { tanya: "Soal 1: Siapa nama panjang gwe", type: "text", jawab: ["muhammad annash ash shidiq"] },
    { tanya: "Soal 2: Merek hp gwej", type: "text", jawab: ["poco f5"] },
    { tanya: "Soal 3: Bapak jamal mempunyai 5 orang anak, namanya jokowa, jokowe, jokowu, jokowo, siapa nama anak terakhir", type: "text", jawab: ["jamal"] },
    { tanya: "Soal 4: Ponakan gwe yang ke 6 (nama panggilan aja derr)", type: "text", jawab: ["shanum","sanum"] },

    // 🔥 SOAL 5 BARU
    {
        tanya: "Soal 5: Berapa nilai sidang gwe",
        type: "select",
        pilihan: ["A+","A","A-","B+","B","B-","C"],
        jawab: ["b+"] // GANTI sesuai jawaban kamu
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

    let warnaClass = "warna" + (index + 1);

    document.getElementById("soal").className = "bubble " + warnaClass;
    document.getElementById("soal").innerHTML = s.tanya;

    document.getElementById("progress-text").innerHTML =
        `Soal ${index+1} dari ${soal.length}`;

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

    setTimeout(() => {
        document.getElementById("input").focus();
    }, 100);
}

function nextSoal() {
    let input = document.getElementById("input").value.toLowerCase().trim();

    if (input === "") {
        alert("Jawab dulu 😁");
        return;
    }

    jawabanUser.push(input);

    let benar = soal[index].jawab.includes(input);

    if (benar) {
        skor++;
        hasilDetail.push("BENAR");
    } else {
        hasilDetail.push("SALAH");
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

    let hasilHTML = `<h3>🎉 Selesai!</h3>`;
    hasilHTML += `<p>Skor: ${skor}/${soal.length}</p><br>`;

    if (skor === soal.length) {
        hasilHTML += `🔥 Aowkaoakowka hebat kamu bang 😎`;
    } else if (skor > 7) {
        hasilHTML += `:v nyaris, dikit lagi 😏`;
    } else if (skor > 4) {
        hasilHTML += `😂 Aowkaokwka lolok`;
    } else {
        hasilHTML += `💀 Loloookkkkkkkk 😭😭😭`;
    }

    hasilHTML += `<hr><h4>❌ Jawaban kamu yang salah:</h4>`;

    for (let i = 0; i < soal.length; i++) {
        if (hasilDetail[i] === "SALAH") {
            hasilHTML += `
                <div class="hasil-card">
                    <b>${soal[i].tanya}</b><br>
                    ❌ ${jawabanUser[i]}
                </div>
            `;
        }
    }

    // 🎁 HADIAH BARU
    if (skor === soal.length) {
        hasilHTML += `
        <br><br>
        🎁 <a href="https://link.dana.id/danakaget?c=ssswlh9kr&r=bywqFE&orderId=20260319101214505215010300166680870334424" target="_blank">
        Ambil Hadiah
        </a>`;
    }

    document.getElementById("hasil").innerHTML = hasilHTML;
}

tampilSoal();