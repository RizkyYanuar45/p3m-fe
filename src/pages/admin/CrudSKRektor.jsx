import { useState, useEffect } from "react";

const initialForm = { file_name: "", file_description: "", file_url: "" };
const api = import.meta.env.VITE_API_URL;

const CrudSKRektor = () => {
  const [panduanPenelitian, setPanduanPenelitian] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // GET: Mengambil data dengan fetch
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${api}/files/type?type=sk_rektor_penelitian`
        );
        if (!response.ok) {
          throw new Error("Gagal mengambil data dari server.");
        }
        const data = await response.json();
        setPanduanPenelitian(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [api]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (editId) {
      // Logika UPDATE (PATCH) dengan fetch
      try {
        const response = await fetch(`${api}/files/update/${editId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
          credentials: "include",
        });
        const updatedData = await response.json();
        if (!response.ok) {
          throw new Error(updatedData.message || "Gagal memperbarui data.");
        }
        setPanduanPenelitian((prev) =>
          prev.map((item) => (item.id === editId ? updatedData : item))
        );
        setEditId(null);
        setForm(initialForm);
      } catch (err) {
        setError(err.message);
      }
    } else {
      // Logika TAMBAH (POST) dengan fetch
      const dataToSend = { ...form, file_type: "sk_rektor_penelitian" };
      try {
        const response = await fetch(`${api}/files/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
          credentials: "include",
        });
        const newData = await response.json();
        if (!response.ok) {
          throw new Error(newData.message || "Gagal menambahkan data.");
        }
        setPanduanPenelitian((prev) => [...prev, newData]);
        setForm(initialForm);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setForm({
      file_name: item.file_name,
      file_description: item.file_description,
      file_url: item.file_url,
    });
  };

  // --- FUNGSI DELETE YANG DIPERBARUI ---
  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      setError("");
      try {
        const response = await fetch(`${api}/files/delete/${id}`, {
          method: "DELETE",
          credentials: "include", // Kirim cookie untuk otentikasi
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Gagal menghapus data.");
        }

        // Jika berhasil, hapus data dari state lokal agar UI terupdate
        setPanduanPenelitian((prev) => prev.filter((item) => item.id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };
  // ------------------------------------

  const handleCancel = () => {
    setEditId(null);
    setForm(initialForm);
  };

  return (
    <div>
      <h3>SK Rektor</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: 16,
          background: "#f9f9f9",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <input
          name="file_name"
          placeholder="Judul"
          value={form.file_name}
          onChange={handleChange}
          required
        />
        <input
          name="file_description"
          placeholder="Deskripsi"
          value={form.file_description}
          onChange={handleChange}
          required
        />
        <input
          name="file_url"
          type="url"
          placeholder="URL File (Google Drive)"
          value={form.file_url}
          onChange={handleChange}
          required
        />

        <button type="submit">{editId ? "Simpan Perubahan" : "Tambah"}</button>
        {editId && (
          <button type="button" onClick={handleCancel}>
            Batal
          </button>
        )}
      </form>

      {loading ? (
        <p>Memuat data...</p>
      ) : (
        <table border="1" cellPadding="8" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>No</th>
              <th>Judul</th>
              <th>Deskripsi</th>
              <th>URL</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {panduanPenelitian.map((item, idx) => (
              <tr key={item.id}>
                <td>{idx + 1}</td>
                <td>{item.file_name}</td>
                <td>{item.file_description}</td>
                <td>
                  <a
                    href={item.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Link
                  </a>
                </td>
                <td>
                  <button onClick={() => handleEdit(item)}>Edit</button>
                  <button onClick={() => handleDelete(item.id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CrudSKRektor;
