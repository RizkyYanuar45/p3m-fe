import { useState } from 'react';

const initialData = {
  informasi: '',
  program: '',
  bukuPanduan: '',
  sk: '',
};

const labelMap = {
  informasi: 'Informasi KKN UNIM',
  program: 'Program KKN UNIM',
  bukuPanduan: 'Buku Panduan KKN BBM',
  sk: 'SK KKN BBM UNIM',
};

const CrudKelolaKKN = ({ kategori }) => {
  const [konten, setKonten] = useState('');
  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => setKonten(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditMode(false);
    alert('Konten berhasil disimpan!');
  };

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => setEditMode(false);

  return (
    <div>
      <h2>Kelola {labelMap[kategori] || 'KKN'}</h2>
      <form onSubmit={handleSubmit} style={{ background: '#f5f5f5', padding: 16, borderRadius: 8, marginBottom: 24 }}>
        <div style={{ marginBottom: 12 }}>
          <label>{labelMap[kategori]}:<br />
            <textarea name="konten" value={konten} onChange={handleChange} rows={5} style={{ width: '100%' }} disabled={!editMode} />
          </label>
        </div>
        {editMode ? (
          <>
            <button type="submit" style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 20px', fontWeight: 600, cursor: 'pointer' }}>Simpan</button>
            <button type="button" onClick={handleCancel} style={{ marginLeft: 12, background: '#e53935', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 20px', fontWeight: 600, cursor: 'pointer' }}>Batal</button>
          </>
        ) : (
          <button type="button" onClick={handleEdit} style={{ background: '#ffb300', color: '#222d32', border: 'none', borderRadius: 4, padding: '8px 20px', fontWeight: 600, cursor: 'pointer' }}>Edit Konten</button>
        )}
      </form>
    </div>
  );
};

export default CrudKelolaKKN;
