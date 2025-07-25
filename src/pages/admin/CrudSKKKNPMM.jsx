import { useState } from 'react';


const initialForm = { judul: '', deskripsi: '', tanggal: '', link: '' };

const CrudSKKKNPMM = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      // Edit mode
      setData((prev) => prev.map((item, idx) => idx === editIndex ? form : item));
      setEditIndex(null);
    } else {
      // Add mode
      setData((prev) => [...prev, form]);
    }
    setForm(initialForm);
  };

  const handleEdit = (idx) => {
    setForm(data[idx]);
    setEditIndex(idx);
  };

  const handleDelete = (idx) => {
    if (window.confirm('Hapus data ini?')) {
      setData((prev) => prev.filter((_, i) => i !== idx));
      if (editIndex === idx) {
        setForm(initialForm);
        setEditIndex(null);
      }
    }
  };

  const handleCancel = () => {
    setForm(initialForm);
    setEditIndex(null);
  };

  return (
    <div>
      <h2>SK KKN PMM</h2>
      <form onSubmit={handleSubmit} style={{ background: '#f5f5f5', padding: 16, borderRadius: 8, marginBottom: 24 }}>
        <div style={{ marginBottom: 12 }}>
          <label>Judul:<br />
            <input
              type="text"
              name="judul"
              value={form.judul}
              onChange={handleChange}
              style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Deskripsi:<br />
            <textarea
              name="deskripsi"
              value={form.deskripsi}
              onChange={handleChange}
              rows={3}
              style={{ width: '100%' }}
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Tanggal:<br />
            <input
              type="date"
              name="tanggal"
              value={form.tanggal}
              onChange={handleChange}
              style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Link SK (URL):<br />
            <input
              type="url"
              name="link"
              value={form.link}
              onChange={handleChange}
              style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
              placeholder="https://contoh-link-sk.com"
              required
            />
          </label>
        </div>
        <button type="submit" style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 20px', fontWeight: 600, cursor: 'pointer' }}>{editIndex !== null ? 'Simpan Perubahan' : 'Tambah SK'}</button>
        {editIndex !== null && (
          <button type="button" onClick={handleCancel} style={{ marginLeft: 12, background: '#e53935', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 20px', fontWeight: 600, cursor: 'pointer' }}>Batal</button>
        )}
      </form>
      <div>
        <h3>Daftar SK KKN PMM</h3>
        {data.length === 0 ? <div style={{ color: '#888' }}>Belum ada data.</div> : (
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
            <thead>
              <tr style={{ background: '#f0f0f0' }}>
                <th style={{ border: '1px solid #ddd', padding: 8 }}>Judul</th>
                <th style={{ border: '1px solid #ddd', padding: 8 }}>Deskripsi</th>
                <th style={{ border: '1px solid #ddd', padding: 8 }}>Tanggal</th>
                <th style={{ border: '1px solid #ddd', padding: 8 }}>Link</th>
                <th style={{ border: '1px solid #ddd', padding: 8 }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={idx}>
                  <td style={{ border: '1px solid #ddd', padding: 8 }}>{item.judul}</td>
                  <td style={{ border: '1px solid #ddd', padding: 8 }}>{item.deskripsi}</td>
                  <td style={{ border: '1px solid #ddd', padding: 8 }}>{item.tanggal}</td>
                  <td style={{ border: '1px solid #ddd', padding: 8 }}>
                    <a href={item.link} target="_blank" rel="noopener noreferrer">Lihat SK</a>
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: 8 }}>
                    <button onClick={() => handleEdit(idx)} style={{ marginRight: 8, background: '#ffb300', color: '#222d32', border: 'none', borderRadius: 4, padding: '4px 12px', fontWeight: 600, cursor: 'pointer' }}>Edit</button>
                    <button onClick={() => handleDelete(idx)} style={{ background: '#e53935', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 12px', fontWeight: 600, cursor: 'pointer' }}>Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CrudSKKKNPMM;
