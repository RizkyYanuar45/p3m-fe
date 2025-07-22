import React, { useState } from 'react';
import { faq as initialFaq } from '../../data/index';

const CrudFaq = () => {
  const [faq, setFaq] = useState(initialFaq);
  const [form, setForm] = useState({});
  const [editIndex, setEditIndex] = useState(null);

  return (
    <div>
      <h3>Data FAQ</h3>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (editIndex !== null) {
            const updated = [...faq];
            updated[editIndex] = { ...form, id: updated[editIndex].id };
            setFaq(updated);
            setEditIndex(null);
          } else {
            setFaq([...faq, { ...form, id: Date.now(), eventKey: faq.length }]);
          }
          setForm({});
        }}
        style={{ marginBottom: 16 }}
      >
        <input
          placeholder="Pertanyaan"
          value={form.title || ''}
          onChange={e => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          placeholder="Jawaban"
          value={form.desc || ''}
          onChange={e => setForm({ ...form, desc: e.target.value })}
          required
        />
        <button type="submit">{editIndex !== null ? 'Simpan' : 'Tambah'}</button>
        {editIndex !== null && <button type="button" onClick={() => { setEditIndex(null); setForm({}); }}>Batal</button>}
      </form>
      <table border="1" cellPadding="8" style={{ width: '100%' }}>
        <thead>
          <tr><th>No</th><th>Pertanyaan</th><th>Jawaban</th><th>Aksi</th></tr>
        </thead>
        <tbody>
          {faq.map((item, idx) => (
            <tr key={item.id}>
              <td>{idx + 1}</td>
              <td>{item.title}</td>
              <td>{item.desc}</td>
              <td>
                <button onClick={() => { setEditIndex(idx); setForm(item); }}>Edit</button>
                <button onClick={() => setFaq(faq.filter((_, i) => i !== idx))}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CrudFaq;
