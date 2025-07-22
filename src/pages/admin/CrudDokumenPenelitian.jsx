import { useState } from 'react';
import {
  DokumenPenelitianData,
  DokumenPenelitianLaporanKemajuanRisetData,
  DokumenPenelitianAkhirRisetKolaborasiData,
  PendirianP3MData,
  SOPP3MData,
  RencanaIndukPenelitianData,
  TemplateData,
  FormSPTJMData,
} from '../../data/dokumenPenelitian';

const allDokumen = [
  { key: 'PendirianP3MData', label: 'SK Pendirian P3M', data: PendirianP3MData },
  { key: 'SOPP3MData', label: 'SOP P3M', data: SOPP3MData },
  { key: 'RencanaIndukPenelitianData', label: 'Rencana Induk Penelitian', data: RencanaIndukPenelitianData },
  { key: 'TemplateData', label: 'Template', data: TemplateData },
  { key: 'FormSPTJMData', label: 'Form SPTJM & Pernyataan Luaran', data: FormSPTJMData },
  { key: 'DokumenPenelitianData', label: 'Dokumen Penelitian', data: DokumenPenelitianData },
  { key: 'DokumenPenelitianLaporanKemajuanRisetData', label: 'Laporan Kemajuan Riset', data: DokumenPenelitianLaporanKemajuanRisetData },
  { key: 'DokumenPenelitianAkhirRisetKolaborasiData', label: 'Akhir Riset Kolaborasi', data: DokumenPenelitianAkhirRisetKolaborasiData },
];

const CrudDokumenPenelitian = () => {
  const [dokumenList, setDokumenList] = useState(allDokumen);
  const [selected, setSelected] = useState(allDokumen[0].key);
  const [form, setForm] = useState({ title: '', driveUrl: '' });

  const handleAdd = () => {
    if (!form.title || !form.driveUrl) return;
    setDokumenList(dokumenList.map(dok =>
      dok.key === selected
        ? { ...dok, data: [...dok.data, { id: Date.now(), title: form.title, driveUrl: form.driveUrl }] }
        : dok
    ));
    setForm({ title: '', driveUrl: '' });
  };

  const handleDelete = (docId) => {
    setDokumenList(dokumenList.map(dok =>
      dok.key === selected
        ? { ...dok, data: dok.data.filter(d => d.id !== docId) }
        : dok
    ));
  };

  const currentDokumen = dokumenList.find(dok => dok.key === selected);

  return (
    <div>
      <h3>Kelola Dokumen Penelitian</h3>
      <div style={{ marginBottom: 16 }}>
        <label>Pilih Kategori:&nbsp;</label>
        <select value={selected} onChange={e => setSelected(e.target.value)}>
          {dokumenList.map(dok => (
            <option key={dok.key} value={dok.key}>{dok.label}</option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: 16 }}>
        <input
          placeholder="Judul Dokumen"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          style={{ marginRight: 8 }}
        />
        <input
          placeholder="Link Google Drive"
          value={form.driveUrl}
          onChange={e => setForm({ ...form, driveUrl: e.target.value })}
          style={{ marginRight: 8 }}
        />
        <button onClick={handleAdd}>Tambah</button>
      </div>
      <table border="1" cellPadding="8" style={{ width: '100%' }}>
        <thead>
          <tr><th>No</th><th>Judul</th><th>Link</th><th>Aksi</th></tr>
        </thead>
        <tbody>
          {currentDokumen.data.map((doc, idx) => (
            <tr key={doc.id}>
              <td>{idx + 1}</td>
              <td>{doc.title}</td>
              <td><a href={doc.driveUrl} target="_blank" rel="noopener noreferrer">Lihat</a></td>
              <td><button onClick={() => handleDelete(doc.id)}>Hapus</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CrudDokumenPenelitian;
