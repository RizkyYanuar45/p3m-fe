import { useState } from 'react';

const CrudStrukturOrganisasi = () => {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);

  const handleUpload = (e) => {
    e.preventDefault();
    if (file) {
      const url = URL.createObjectURL(file);
      setImages([...images, { id: Date.now(), url, name: file.name }]);
      setFile(null);
    }
  };

  const handleDelete = (id) => {
    setImages(images.filter(img => img.id !== id));
  };

  return (
    <div>
      <h3>Struktur Organisasi - Upload Foto</h3>
      <form onSubmit={handleUpload} style={{ marginBottom: 16 }}>
        <input
          type="file"
          accept="image/*"
          onChange={e => setFile(e.target.files[0])}
          required
        />
        <button type="submit" style={{ marginLeft: 8 }}>Upload</button>
      </form>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        {images.map(img => (
          <div key={img.id} style={{ border: '1px solid #ccc', borderRadius: 8, padding: 8, textAlign: 'center' }}>
            <img src={img.url} alt={img.name} style={{ maxWidth: 180, maxHeight: 180, display: 'block', marginBottom: 8 }} />
            <div style={{ fontSize: 14 }}>{img.name}</div>
            <button onClick={() => handleDelete(img.id)} style={{ marginTop: 8, background: '#e53935', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 12px', cursor: 'pointer' }}>Hapus</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrudStrukturOrganisasi;
