import { useState } from 'react';
import { panduanPenelitian as initialPanduanPenelitian } from '../../data/panduanPenelitian';

const CrudPanduanPenelitian = () => {
  const [panduanPenelitian, setPanduanPenelitian] = useState(initialPanduanPenelitian);
  const [form, setForm] = useState({});
  const [editIndex, setEditIndex] = useState(null);

  return (
    <div>
      <h3>Data Panduan Penelitian</h3>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (editIndex !== null) {
            const updated = [...panduanPenelitian];
            updated[editIndex] = { ...form, id: updated[editIndex].id };
            setPanduanPenelitian(updated);
            setEditIndex(null);
          } else {
            setPanduanPenelitian([...panduanPenelitian, { ...form, id: Date.now() }]);
          }
          setForm({});
        }}
        style={{ marginBottom: 16 }}
      >
        <input
          placeholder="Judul"
          value={form.title || ''}
          onChange={e => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          placeholder="Deskripsi"
          value={form.description || ''}
          onChange={e => setForm({ ...form, description: e.target.value })}
          required
        />
        <input
          placeholder="Tanggal"
          value={form.date || ''}
          onChange={e => setForm({ ...form, date: e.target.value })}
          required
        />
        <input
          placeholder="URL Drive"
          value={form.urlDrive || ''}
          onChange={e => setForm({ ...form, urlDrive: e.target.value })}
          required
        />
        <button type="submit">{editIndex !== null ? 'Simpan' : 'Tambah'}</button>
        {editIndex !== null && <button type="button" onClick={() => { setEditIndex(null); setForm({}); }}>Batal</button>}
      </form>
      <table border="1" cellPadding="8" style={{ width: '100%' }}>
        <thead>
          <tr><th>No</th><th>Judul</th><th>Deskripsi</th><th>Tanggal</th><th>URL</th><th>Aksi</th></tr>
        </thead>
        <tbody>
          {panduanPenelitian.map((item, idx) => (
            <tr key={item.id}>
              <td>{idx + 1}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.date}</td>
              <td><a href={item.urlDrive} target="_blank" rel="noopener noreferrer">Link</a></td>
              <td>
                <button onClick={() => { setEditIndex(idx); setForm(item); }}>Edit</button>
                <button onClick={() => setPanduanPenelitian(panduanPenelitian.filter((_, i) => i !== idx))}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CrudPanduanPenelitian;
