export const karangTarunaStructure = {
  data: {
    person: {
      name: "Dosen Pembimbing Lapangan",
      title: "Aby Nugrah Septanto, S.Kep., Ns., M.Sc.",
    },
    children: [
      {
        person: {
          name: "Ketua",
          title: "Teguh",
          department: "Ilmu Keolahragaan",
        },
        children: [
          {
            person: {
              name: "Sekretaris",
              title: "Amanda",
              department: "Administrasi Negara",
            },
            children: [
              {
                person: {
                  name: "Humas",
                  title: "Theo",
                  department: "Matematika",
                },
              },
              { person: { name: "Humas", title: "Nurma", department: "PPKN" } },
              {
                person: {
                  name: "Humas",
                  title: "Isna",
                  department: "Akuntansi",
                },
              },
            ],
          },
          {
            person: {
              name: "Bendahara",
              title: "Fadilah",
              department: "Akuntansi",
            },
            children: [
              {
                person: {
                  name: "Acara",
                  title: "Theo",
                  department: "Matematika",
                },
              },
              { person: { name: "Acara", title: "Nurma", department: "PPKN" } },
              {
                person: {
                  name: "Acara",
                  title: "Isna",
                  department: "Akuntansi",
                },
              },
            ],
          },
          {
            person: {
              name: "Divisi Lain",
              title: "Perkap",
              department: "Logistik",
            },
            children: [
              {
                person: {
                  name: "Perkap",
                  title: "Iqbal",
                  department: "Ilmu Keolahragaan",
                },
              },
              {
                person: {
                  name: "Perkap",
                  title: "Burhan",
                  department: "Teknik Sipil",
                },
              },
              {
                person: {
                  name: "Perkap",
                  title: "Lutfi",
                  department: "Teknik Sipil",
                },
              },
            ],
          },
        ],
      },
    ],
  },
};

// --- Perbaikan Data Struktur Dusun ---
export const dusunStructure = {
  data: {
    person: {
      name: "Kepala Dusun",
      title: "Bapak Murtaji",
    },
    children: [
      { person: { name: "Ketua RT 1", title: "Bapak Ahmad" } },
      { person: { name: "Ketua RT 2", title: "Ibu Siti" } },
      { person: { name: "Ketua RT 3", title: "Ibu Siti" } },
      { person: { name: "Ketua RT 4", title: "Ibu Siti" } },
    ],
  },
};
