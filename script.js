/* Rangkuman Materi & Kuis Interaktif IPAS Kelas 5
   Disusun oleh Erna Trisnawati, S.Pd.I
   Sumber: Buku Siswa IPAS SD/MI Kelas V (Edisi Revisi 2024), Kemendikbudristek */

const CONFIG = {
  API_URL: "api.php",   // alamat api.php di hosting Anda
  WA_GURU: ""           // isi nomor WA guru format 62812xxxx (kosongkan = siswa mengisi sendiri)
};

const $ = id => document.getElementById(id);
const S = { id: null, nama: "", sekolah: "", topic: null, i: 0, benar: 0, soal: [], done: {} };

/* Format soal: [pertanyaan, [jawaban benar, salah, salah, salah], hots?] — pilihan diacak otomatis */
const TOPICS = [
{id:1,c:"#ff6b6b",title:"Di Mana Indonesia Berada?",sub:"Letak geografis, maritim & agraris",
materi:`<h4>Letak Indonesia</h4><p>Letak astronomis Indonesia: <b>6° LU – 11° LS</b> dan <b>95° BT – 141° BT</b>. Secara geografis Indonesia diapit <b>2 benua</b> (Asia dan Australia) dan <b>2 samudra</b> (Hindia dan Pasifik).</p>
<h4>Negara Kepulauan</h4><p>Indonesia memiliki lebih dari 17.000 pulau dan merupakan negara kepulauan terbesar di dunia. Dilalui <b>garis khatulistiwa (0°)</b>, sehingga beriklim tropis dan dijuluki <b>Zamrud Khatulistiwa</b>.</p>
<h4>Maritim dan Agraris</h4><ul><li><b>Maritim</b>: sebagian besar wilayah berupa perairan, banyak yang menjadi nelayan.</li><li><b>Agraris</b>: tanahnya subur, banyak yang menjadi petani. Rempah-rempah terkenal di dunia.</li></ul>
<div class="tip">💡 <b>ALKI</b> menghubungkan Samudra Hindia dan Pasifik, sehingga perairan Indonesia menjadi jalur perdagangan dunia.</div>`,
quiz:[
["Indonesia diapit oleh dua benua, yaitu ...",["Asia dan Australia","Asia dan Afrika","Eropa dan Australia","Amerika dan Asia"]],
["Garis lintang 0° yang membuat Indonesia beriklim tropis disebut ...",["Khatulistiwa","Meridian","Garis tanggal","Kutub"]],
["Desa A berada di tepi pantai, Desa B di lereng gunung yang subur. Mata pencaharian yang paling mungkin adalah ...",["A nelayan, B petani/berkebun","A petani, B nelayan","Keduanya nelayan","Keduanya penambang garam"],1],
["Perairan Indonesia dilalui jalur ALKI yang ramai kapal dunia. Dampak negatif yang paling mungkin adalah ...",["Risiko pencemaran laut dan masalah keamanan","Curah hujan berkurang","Jumlah pulau bertambah","Suhu udara turun"],1]]},

{id:2,c:"#ff9f1c",title:"Majulah Daerahku!",sub:"Kegiatan ekonomi & pelaku ekonomi",
materi:`<h4>Kegiatan Ekonomi</h4><ul><li><b>Produksi</b>: membuat barang atau jasa.</li><li><b>Distribusi</b>: pengiriman/penyaluran barang dari produsen ke konsumen.</li><li><b>Konsumsi</b>: penggunaan barang atau jasa.</li></ul>
<h4>Pelaku Ekonomi</h4><p><b>Produsen</b> (menghasilkan), <b>distributor</b> (menyalurkan), dan <b>konsumen</b> (menggunakan).</p>
<h4>Faktor yang Memengaruhi</h4><p>Sumber daya alam, infrastruktur (jalan, jembatan, pasar), dan teknologi. Konsumsi menghasilkan <b>sampah</b> yang harus dikelola agar tidak merusak lingkungan.</p>`,
quiz:[
["Kegiatan membuat barang disebut ...",["Produksi","Distribusi","Konsumsi","Barter"]],
["Penyaluran barang dari produsen ke konsumen disebut ...",["Distribusi","Produksi","Konsumsi","Ekstraktif"]],
["Jalan Trans Kalimantan rusak sehingga pasokan ayam dan gas terlambat. Kegiatan ekonomi yang paling terganggu adalah ...",["Distribusi","Produksi","Konsumsi","Reboisasi"],1],
["Luas hutan Indonesia berkurang. Sikap pelaku ekonomi yang bijak adalah ...",["Memanfaatkan SDA secukupnya dan menjaga kelestariannya","Menebang hutan sebanyak mungkin","Menjual semua kayu ke luar negeri","Membiarkan hutan tanpa dijaga"],1]]},

{id:3,c:"#22c55e",title:"Harmoni dalam Ekosistem",sub:"Biotik, abiotik & jaring-jaring makanan",
materi:`<h4>Komponen Ekosistem</h4><p><b>Biotik</b> = makhluk hidup (manusia, sapi, rumput, jamur). <b>Abiotik</b> = benda tak hidup (matahari, air, udara, tanah, batu).</p>
<h4>Tingkatan</h4><p>Individu → Populasi → Komunitas → Ekosistem. Tempat tinggal makhluk hidup disebut <b>habitat</b>.</p>
<h4>Rantai dan Jaring-jaring Makanan</h4><ul><li><b>Produsen</b>: tumbuhan (membuat makanan sendiri).</li><li><b>Konsumen</b>: herbivora, karnivora, omnivora.</li><li><b>Dekomposer</b>: bakteri dan jamur, pengurai sisa makhluk hidup.</li></ul>
<div class="tip">💡 Keseimbangan ekosistem dapat terganggu oleh bencana alam dan perilaku manusia (menebang hutan, plastik berlebihan).</div>`,
quiz:[
["Berikut yang termasuk komponen abiotik adalah ...",["Batu","Jamur","Rumput","Cacing"]],
["Makhluk hidup yang membuat makanannya sendiri disebut ...",["Produsen","Konsumen","Dekomposer","Predator"]],
["Rantai: padi → tikus → ular → elang. Jika ular berkurang drastis, populasi tikus akan ...",["Meningkat","Menurun","Tetap","Menghilang"],1],
["Beruang madu masuk ke permukiman warga. Penyebab yang paling mungkin adalah ...",["Habitat rusak sehingga makanan berkurang","Beruang ingin berteman","Cuaca terlalu dingin","Jumlah pohon bertambah"],1]]},

{id:4,c:"#4cc9f0",title:"Air Sumber Kehidupan",sub:"Siklus air & air bersih",
materi:`<h4>Siklus Air</h4><ul><li><b>Evaporasi</b>: penguapan air di permukaan bumi karena panas matahari.</li><li><b>Transpirasi</b>: pelepasan uap air oleh tumbuhan.</li><li><b>Kondensasi</b>: uap air berubah menjadi butir air dan membentuk awan.</li><li><b>Presipitasi</b>: air jatuh sebagai hujan, es, atau salju.</li><li><b>Infiltrasi</b>: air meresap ke dalam tanah.</li></ul>
<h4>Air Bersih</h4><p>Air mengalir dari <b>hulu</b> (tinggi) ke <b>hilir</b> (rendah, dekat muara). Pencemaran air berasal dari limbah rumah tangga, pabrik, dan pestisida. Hemat air dan buat daerah resapan air.</p>`,
quiz:[
["Penguapan air di permukaan bumi karena panas matahari disebut ...",["Evaporasi","Kondensasi","Presipitasi","Infiltrasi"]],
["Uap air berubah menjadi butir-butir air dan membentuk awan. Proses ini disebut ...",["Kondensasi","Evaporasi","Transpirasi","Infiltrasi"]],
["Air terus dipakai manusia, tetapi jumlah air di bumi tidak berkurang. Hal ini karena ...",["Air berputar terus dalam siklus air","Air laut tidak pernah menguap","Hujan hanya turun sekali","Air di bumi selalu bertambah dari luar angkasa"],1],
["Cara paling tepat mengurangi risiko banjir bandang di hulu sungai adalah ...",["Menanam pohon dan menjaga daerah resapan air","Menebang pohon di lereng","Membuang sampah ke sungai","Menutup semua tanah dengan semen"],1]]},

{id:5,c:"#a855f7",title:"Daerahku yang Bersejarah",sub:"Sejarah & warisan budaya",
materi:`<h4>Periode Sejarah</h4><p>Prasejarah → Hindu-Buddha → Islam → Penjajahan (VOC 1602) → Pendudukan Jepang (1942) → Kemerdekaan (17 Agustus 1945).</p>
<h4>Warisan Budaya</h4><ul><li><b>Benda</b>: bisa dilihat dan diraba (candi, pakaian adat, alat musik).</li><li><b>Tak benda</b>: tidak bisa diraba (tarian, bahasa daerah, adat istiadat, resep, jamu).</li></ul>
<h4>Akulturasi dan Pelestarian</h4><p><b>Akulturasi</b> adalah percampuran dua budaya atau lebih, misalnya Masjid Menara Kudus (Jawa dan Hindu). Kerajaan <b>Majapahit</b> didirikan Raden Wijaya (1293) dan mencapai kejayaan bersama Gajah Mada.</p>`,
quiz:[
["Contoh warisan budaya tak benda adalah ...",["Tarian daerah","Candi","Keris","Rumah adat"]],
["VOC didirikan pada tahun ...",["1602","1293","1942","1945"]],
["Arsitektur Masjid Menara Kudus memadukan budaya Jawa dan Hindu. Hal ini menunjukkan adanya ...",["Akulturasi","Kolonisasi","Migrasi","Erosi"],1],
["Generasi muda jarang melakukan budaya daerah. Langkah paling tepat untuk melestarikannya adalah ...",["Memperkenalkan dan ikut melakukannya di sekolah dan lingkungan","Membiarkannya hilang","Melarang orang menampilkannya","Menyimpannya di gudang saja"],1]]},

{id:6,c:"#ec4899",title:"Perubahan pada Diriku",sub:"Masa pubertas, kesehatan & privasi",
materi:`<h4>Masa Pubertas</h4><p>Pubertas adalah masa peralihan dari anak-anak menuju dewasa, umumnya usia <b>10–18 tahun</b>. Perubahannya meliputi <b>fisik, emosional, dan sosial</b>. Tanda pada laki-laki: suara membesar, jakun tumbuh. Tanda pada perempuan: haid, payudara dan pinggul membesar.</p>
<h4>Sehat Tubuh dan Pikiran</h4><p>Jaga kebersihan diri, makan bergizi, cukup tidur, berolahraga, dan bergaul sehat.</p>
<h4>Privasi</h4><p>Tubuhmu adalah privasimu. Area pribadi tidak boleh disentuh atau dilihat orang lain tanpa izin. Berani menolak dan segera bercerita kepada orang tua atau guru yang dipercaya.</p>`,
quiz:[
["Masa peralihan dari anak-anak menuju dewasa disebut ...",["Pubertas","Bayi","Lansia","Balita"]],
["Menurut Kemenkes, masa puber umumnya terjadi pada usia ...",["10–18 tahun","3–5 tahun","25–30 tahun","40–50 tahun"]],
["Dara mulai berjerawat dan mudah berkeringat sehingga malu. Sikap paling tepat adalah ...",["Menjaga kebersihan diri dan bercerita pada orang tua atau guru","Menutupi diri dan tidak mau bergaul","Tidak mandi supaya tidak dilihat orang","Mengejek teman yang sama"],1],
["Ada orang yang menyentuh area pribadimu tanpa izin. Sikap paling tepat adalah ...",["Menolak tegas, menjauh, lalu bercerita kepada orang tua atau guru","Diam dan merahasiakannya","Membalas dengan kekerasan","Menganggapnya bercanda"],1]]},

{id:7,c:"#f59e0b",title:"Bermain dengan Cahaya",sub:"Sifat cahaya, bayangan & warna",
materi:`<h4>Sifat Cahaya</h4><ul><li>Merambat <b>lurus</b>.</li><li>Dapat <b>dipantulkan</b> (cermin, aluminium foil).</li><li>Dapat menembus benda <b>bening</b>, sebagian menembus benda <b>buram</b>, dan tidak menembus benda <b>gelap</b>.</li><li>Cahaya putih dapat <b>diuraikan</b> menjadi warna pelangi (merah, jingga, kuning, hijau, biru, nila, ungu).</li></ul>
<h4>Bayangan</h4><p>Bayangan terbentuk jika cahaya terhalang benda gelap. Semakin dekat benda ke sumber cahaya, bayangan semakin <b>besar</b>.</p>`,
quiz:[
["Cahaya merambat dengan arah ...",["Lurus","Melengkung","Zig-zag","Berputar"]],
["Benda yang dapat ditembus cahaya seluruhnya disebut benda ...",["Bening","Buram","Gelap","Kasar"]],
["Bola didekatkan ke arah senter. Bayangan bola pada dinding akan ...",["Semakin besar","Semakin kecil","Hilang","Tidak berubah"],1],
["Pelangi terbentuk setelah hujan karena ...",["Tetes air menguraikan cahaya matahari","Awan mengeluarkan warna","Bumi memantulkan cahaya bulan","Angin mengubah warna langit"],1]]},

{id:8,c:"#0ea5e9",title:"Ramai karena Bunyi",sub:"Sifat & perambatan bunyi",
materi:`<h4>Bunyi</h4><p>Bunyi berasal dari benda yang <b>bergetar</b>. Semakin cepat getaran, bunyi semakin <b>tinggi</b>. Kerasnya bunyi disebut <b>intensitas</b>.</p>
<h4>Perambatan Bunyi</h4><p>Bunyi membutuhkan <b>medium</b> (padat, cair, gas). Bunyi merambat paling baik pada benda <b>padat</b>, lalu cair, lalu udara. Berbeda dengan cahaya, bunyi tidak dapat merambat di ruang hampa.</p>
<h4>Pemantulan dan Peredaman</h4><p>Bunyi dipantulkan oleh benda keras (tembok). <b>Gema</b> terdengar setelah bunyi asli, <b>gaung</b> terdengar bersamaan. Benda lunak (busa, karpet) <b>meredam</b> bunyi. Kelelawar dan lumba-lumba memakai <b>ekolokasi</b>.</p>`,
quiz:[
["Bunyi dihasilkan oleh benda yang ...",["Bergetar","Diam","Panas","Dingin"]],
["Medium yang paling baik merambatkan bunyi adalah benda ...",["Padat","Cair","Gas","Ruang hampa"]],
["Dinding bioskop dipasangi busa atau karpet supaya ...",["Bunyi teredam dan tidak bergaung","Bunyi semakin memantul","Ruangan lebih terang","Dinding tidak dingin"],1],
["Senar gitar dikencangkan. Bunyi yang dihasilkan menjadi lebih tinggi karena ...",["Getarannya menjadi lebih cepat","Getarannya menjadi lebih lambat","Senar menjadi lebih panjang","Senar berhenti bergetar"],1]]}
];

/* Gabungkan materi diperinci & soal tambahan dari tambahan.js */
TOPICS.forEach(t => { const e = window.EXTRA && window.EXTRA[t.id]; if (e) { if (e.materi) t.materi = e.materi; if (e.quiz) t.quiz = t.quiz.concat(e.quiz); } });

/* ---------- Penyimpanan: SQL hosting via api.php, cadangan localStorage ---------- */
async function api(action, data) {
  try {
    const r = await fetch(CONFIG.API_URL + "?action=" + action, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data || {})
    });
    if (!r.ok) throw 0;
    return await r.json();
  } catch (e) { return null; }
}
const localGet = () => JSON.parse(localStorage.getItem("ipas5_rank") || "{}");
function localSave() {
  const all = localGet(), k = S.nama + "|" + S.sekolah;
  all[k] = { nama: S.nama, sekolah: S.sekolah, total: total(), bab: Object.keys(S.done).length };
  try { localStorage.setItem("ipas5_rank", JSON.stringify(all)); } catch (e) {}
}
const total = () => Object.values(S.done).reduce((a, b) => a + b.skor, 0);
const nilai = t => Math.round(t.skor / t.tot * 100);

/* ---------- Alur aplikasi ---------- */
async function startApp() {
  const n = $("nama").value.trim(), s = $("sekolah").value.trim();
  if (!n || !s) { $("err").style.display = "block"; return; }
  S.nama = n; S.sekolah = s;
  const r = await api("daftar", { nama: n, sekolah: s });
  S.id = r && r.id ? r.id : null;
  $("h-nama").textContent = n; $("h-sek").textContent = s;
  $("s-cover").classList.add("hide"); $("s-home").classList.remove("hide");
  renderList();
}
function show(id) { ["s-home", "s-topic", "s-rank"].forEach(x => $(x).classList.toggle("hide", x !== id)); window.scrollTo(0, 0); }
function toHome() { show("s-home"); renderList(); }
function renderList() {
  $("list").innerHTML = TOPICS.map(t => {
    const d = S.done[t.id];
    return `<div class="item" style="--c:${t.c}" onclick="openTopic(${t.id})"><div class="num" style="background:${t.c}">${t.id}</div>
    <div class="t">Bab ${t.id}. ${t.title}<small>${t.sub}</small></div><div class="sc ${d ? "done" : ""}">${d ? d.skor + "/" + d.tot : "Belum"}</div></div>`;
  }).join("");
  $("h-prog").textContent = Object.keys(S.done).length + "/" + TOPICS.length + " bab";
}
function openTopic(id) {
  S.topic = TOPICS.find(t => t.id === id);
  const t = S.topic;
  document.documentElement.style.setProperty("--acc", t.c);
  $("thead").style.background = t.c;
  $("t-title").textContent = "Bab " + t.id + ". " + t.title; $("t-sub").textContent = t.sub;
  $("p-m").innerHTML = t.materi;
  show("s-topic"); tab("m");
}
function tab(k) {
  $("tb-m").classList.toggle("active", k === "m"); $("tb-k").classList.toggle("active", k === "k");
  $("p-m").classList.toggle("hide", k !== "m"); $("p-k").classList.toggle("hide", k === "m");
  if (k === "k") startQuiz();
}
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
function startQuiz() {
  S.i = 0; S.benar = 0;
  S.soal = shuffle(S.topic.quiz).map(q => ({ q: q[0], benar: q[1][0], opts: shuffle(q[1]), hots: !!q[2] }));
  renderQ();
}
function renderQ() {
  const q = S.soal[S.i], n = S.soal.length;
  if (!q) return result();
  $("p-k").innerHTML = `<div class="qtop"><span>Soal ${S.i + 1} dari ${n}</span>${q.hots ? '<span class="hots">⚡ HOTS</span>' : ""}</div>
  <div class="bar"><i style="width:${S.i / n * 100}%"></i></div><div class="q">${q.q}</div>
  <div id="opts">${q.opts.map((o, i) => `<button class="opt" onclick="pick(${i})">${"ABCD"[i]}. ${o}</button>`).join("")}</div>
  <div class="fb" id="fb"></div><button class="btn hide" id="nx" onclick="S.i++;renderQ()">${S.i + 1 === n ? "Lihat Hasil 🎉" : "Lanjut →"}</button>`;
}
function pick(i) {
  const q = S.soal[S.i], b = document.querySelectorAll("#opts .opt");
  if ($("nx").classList.contains("hide") === false) return;
  b.forEach((el, k) => { el.disabled = true; if (q.opts[k] === q.benar) el.classList.add("ok"); else if (k === i) el.classList.add("no"); });
  const ok = q.opts[i] === q.benar; if (ok) S.benar++;
  $("fb").textContent = ok ? "🎉 Hebat, jawabanmu benar!" : "😊 Belum tepat. Jawaban benar: " + q.benar;
  $("nx").classList.remove("hide");
}
async function result() {
  const t = S.topic, n = S.soal.length, sk = S.benar;
  S.done[t.id] = { skor: sk, tot: n };
  localSave();
  api("skor", { id: S.id, nama: S.nama, sekolah: S.sekolah, bab: t.id, skor: sk, total: n });
  const msg = sk === n ? "Luar biasa! Sempurna! 🌟" : sk >= n / 2 ? "Bagus! Terus semangat belajar! 👍" : "Ayo baca materinya lagi, lalu coba lagi! 💪";
  $("p-k").innerHTML = `<div class="res"><div class="big">${sk}/${n}</div><p>Nilai: <b>${nilai(S.done[t.id])}</b> · ${msg}</p>
  ${CONFIG.WA_GURU ? "" : '<input id="wa" inputmode="numeric" placeholder="Nomor WA guru (contoh 62812xxxx)">'}
  <button class="btn wa" onclick="kirimWA()">📲 Kirim Hasil ke WhatsApp Guru</button>
  <button class="btn alt" onclick="tab('k')">🔁 Ulangi Kuis</button>
  <button class="btn" onclick="openRank()">🏆 Lihat Peringkat Global</button></div>`;
}
function kirimWA() {
  const t = S.topic, d = S.done[t.id];
  let no = (CONFIG.WA_GURU || ($("wa") ? $("wa").value : "")).replace(/\D/g, "");
  if (no.startsWith("0")) no = "62" + no.slice(1);
  if (!no) { alert("Isi nomor WhatsApp guru terlebih dahulu."); return; }
  const teks = `Assalamualaikum Bu Erna 🙏\nHasil Kuis IPAS Kelas 5\nNama: ${S.nama}\nSekolah: ${S.sekolah}\nBab ${t.id}: ${t.title}\nSkor: ${d.skor}/${d.tot} (nilai ${nilai(d)})`;
  window.open("https://wa.me/" + no + "?text=" + encodeURIComponent(teks), "_blank");
}
async function openRank() {
  show("s-rank"); $("r-body").textContent = "Memuat...";
  let list = await api("peringkat"), ket = "";
  if (!list || !Array.isArray(list)) {
    list = Object.values(localGet()).sort((a, b) => b.total - a.total); ket = "Mode offline: peringkat hanya dari perangkat ini.";
  }
  $("r-body").innerHTML = list.length ? `<table class="rk"><tr><th>#</th><th>Nama</th><th>Sekolah</th><th>Skor</th></tr>${list.slice(0, 50).map((r, i) =>
    `<tr class="${r.nama === S.nama && r.sekolah === S.sekolah ? "me" : ""}"><td>${["🥇", "🥈", "🥉"][i] || i + 1}</td><td>${esc(r.nama)}</td><td>${esc(r.sekolah)}</td><td>${r.total}</td></tr>`).join("")}</table>` +
    `<div class="note">${ket}</div>` : "Belum ada data peringkat.";
}
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
