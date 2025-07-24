import { useState } from 'react';

const CrudJurnalLayananMasyarakat = () => {
  const [link, setLink] = useState('');
  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => setLink(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditMode(false);
    alert('Link jurnal berhasil disimpan!');
  };

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => setEditMode(false);

  return (
    <div>
      <h2>Jurnal Layanan Masyarakat</h2>
      <form onSubmit={handleSubmit} style={{ background: '#f5f5f5', padding: 16, borderRadius: 8, marginBottom: 24 }}>
        <div style={{ marginBottom: 12 }}>
          <label>Link Jurnal:<br />
            <input
              type="url"
              name="link"
              value={link}
              onChange={handleChange}
              style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
              placeholder="https://contoh-jurnal.com"
              disabled={!editMode}
              required
            />
          </label>
        </div>
        {editMode ? (
          <>
            <button type="submit" style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 20px', fontWeight: 600, cursor: 'pointer' }}>Simpan</button>
            <button type="button" onClick={handleCancel} style={{ marginLeft: 12, background: '#e53935', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 20px', fontWeight: 600, cursor: 'pointer' }}>Batal</button>
          </>
        ) : (
          <button type="button" onClick={handleEdit} style={{ background: '#ffb300', color: '#222d32', border: 'none', borderRadius: 4, padding: '8px 20px', fontWeight: 600, cursor: 'pointer' }}>Edit Link</button>
        )}
      </form>
      {link && (
        <div style={{ marginTop: 16 }}>
          <strong>Preview Link:</strong> <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
        </div>
      )}
    </div>
  );
};

export default CrudJurnalLayananMasyarakat;
