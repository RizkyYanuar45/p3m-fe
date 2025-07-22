import { useState } from 'react';
import { pimpinanLembaga as initialPimpinanLembaga } from '../../data/pimpinanLembaga';

const CrudPimpinanLembaga = () => {
  const [pimpinanLembaga, setPimpinanLembaga] = useState(initialPimpinanLembaga);
  const [form, setForm] = useState({});
  const [editIndex, setEditIndex] = useState(null);
  const [preview, setPreview] = useState(null);

  return (
    <div>
      <h3>Data Pimpinan Lembaga</h3>
      <form
        onSubmit={e => {
          e.preventDefault();
          let image = form.image;
          if (form.imageFile) {
            image = preview;
          }
          if (editIndex !== null) {
            const updated = [...pimpinanLembaga];
            updated[editIndex] = { ...form, image, id: updated[editIndex].id };
            setPimpinanLembaga(updated);
            setEditIndex(null);
          } else {
            setPimpinanLembaga([...pimpinanLembaga, { ...form, image, id: Date.now() }]);
          }
          setForm({});
          setPreview(null);
        }}
        style={{ marginBottom: 16 }}
      >
        <input
          placeholder="Nama"
          value={form.name || ''}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Jabatan"
          value={form.position || ''}
          onChange={e => setForm({ ...form, position: e.target.value })}
          required
        />
        <input
          placeholder="Email"
          value={form.email || ''}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={e => {
            const file = e.target.files[0];
            if (file) {
              setForm({ ...form, imageFile: file });
              const reader = new FileReader();
              reader.onloadend = () => setPreview(reader.result);
              reader.readAsDataURL(file);
            }
          }}
        />
        {(preview || form.image) && (
          <div style={{ margin: '8px 0' }}>
            <img src={preview || form.image} alt="Preview" style={{ maxWidth: 80, maxHeight: 80, borderRadius: 8 }} />
          </div>
        )}
        <button type="submit">{editIndex !== null ? 'Simpan' : 'Tambah'}</button>
        {editIndex !== null && <button type="button" onClick={() => { setEditIndex(null); setForm({}); }}>Batal</button>}
      </form>
      <table border="1" cellPadding="8" style={{ width: '100%' }}>
        <thead>
          <tr><th>No</th><th>Foto</th><th>Nama</th><th>Jabatan</th><th>Email</th><th>Aksi</th></tr>
        </thead>
        <tbody>
          {pimpinanLembaga.map((item, idx) => (
            <tr key={item.id}>
              <td>{idx + 1}</td>
              <td>{item.image && <img src={item.image} alt="foto" style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover' }} />}</td>
              <td>{item.name}</td>
              <td>{item.position}</td>
              <td>{item.email}</td>
              <td>
                <button onClick={() => { setEditIndex(idx); setForm(item); setPreview(item.image || null); }}>Edit</button>
                <button onClick={() => setPimpinanLembaga(pimpinanLembaga.filter((_, i) => i !== idx))}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CrudPimpinanLembaga;
