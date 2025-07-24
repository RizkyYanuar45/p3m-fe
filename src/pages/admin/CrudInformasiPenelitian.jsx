


import { useState } from 'react';
const CrudInformasiPenelitian = () => {
  const [data, setData] = useState([
    { id: 1, judul: 'Penelitian A', deskripsi: 'Deskripsi penelitian A' },
    { id: 2, judul: 'Penelitian B', deskripsi: 'Deskripsi penelitian B' },
  ]);
  const [form, setForm] = useState({ judul: '', deskripsi: '' });
  // QuillJS dihapus, tidak perlu ref/instance
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Tidak ada QuillJS, tidak perlu useEffect

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      setData(data.map(item => item.id === editId ? { ...item, ...form } : item));
      setEditId(null);
    } else {
      setData([...data, { id: Date.now(), ...form }]);
    }
    setForm({ judul: '', deskripsi: '' });
    // Tidak perlu reset Quill editor
  };

  const handleEdit = (item) => {
    setForm({ judul: item.judul, deskripsi: item.deskripsi });
    setEditId(item.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus data ini?')) {
      setData(data.filter(item => item.id !== id));
      if (editId === id) {
        setEditId(null);
        setForm({ judul: '', deskripsi: '' });
      }
    }
  };

  return (
    <div>
      <h2>Informasi Penelitian</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 24, background: '#f5f5f5', padding: 16, borderRadius: 8 }}>
        <div style={{ marginBottom: 8 }}>
          <label>Judul:<br />
            <input
              type="text"
              name="judul"
              value={form.judul}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Deskripsi:<br />
            <textarea
              name="deskripsi"
              value={form.deskripsi}
              onChange={handleChange}
              required
              rows={3}
              style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
            />
          </label>
        </div>
        <button type="submit" style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 20px', fontWeight: 600, cursor: 'pointer' }}>
          {editId ? 'Update' : 'Tambah'}
        </button>
        {editId && (
          <button type="button" onClick={() => { setEditId(null); setForm({ judul: '', deskripsi: '' }); }} style={{ marginLeft: 12, background: '#e53935', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 20px', fontWeight: 600, cursor: 'pointer' }}>
            Batal
          </button>
        )}
      </form>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
        <thead>
          <tr style={{ background: '#1976d2', color: '#fff' }}>
            <th style={{ padding: 8, border: '1px solid #ddd' }}>Judul</th>
            <th style={{ padding: 8, border: '1px solid #ddd' }}>Deskripsi</th>
            <th style={{ padding: 8, border: '1px solid #ddd' }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr><td colSpan={3} style={{ textAlign: 'center', padding: 16 }}>Belum ada data.</td></tr>
          ) : (
            data.map(item => (
              <tr key={item.id}>
                <td style={{ padding: 8, border: '1px solid #ddd' }}>{item.judul}</td>
                <td style={{ padding: 8, border: '1px solid #ddd' }}>{item.deskripsi}</td>
                <td style={{ padding: 8, border: '1px solid #ddd' }}>
                  <button onClick={() => handleEdit(item)} style={{ marginRight: 8, background: '#ffb300', color: '#222d32', border: 'none', borderRadius: 4, padding: '4px 12px', fontWeight: 600, cursor: 'pointer' }}>Edit</button>
                  <button onClick={() => handleDelete(item.id)} style={{ background: '#e53935', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 12px', fontWeight: 600, cursor: 'pointer' }}>Hapus</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CrudInformasiPenelitian;
