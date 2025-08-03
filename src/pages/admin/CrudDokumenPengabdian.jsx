import { useState, useEffect } from "react";

const api = import.meta.env.VITE_API_URL;

const CrudDokumenPengabdian = () => {
  const [categories, setCategories] = useState([]);
  const [documents, setDocuments] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [docForm, setDocForm] = useState({
    file_name: "",
    file_url: "",
    catdokumenpengabId: "",
  });
  const [editDocId, setEditDocId] = useState(null);

  const [categoryForm, setCategoryForm] = useState({ name: "" });
  const [editCategoryId, setEditCategoryId] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      setError("");
      try {
        const [catResponse, docResponse] = await Promise.all([
          fetch(`${api}/catdokumenpengab`),
          fetch(`${api}/dokumenpengab`),
        ]);

        if (!catResponse.ok || !docResponse.ok) {
          throw new Error("Gagal memuat data awal dari server.");
        }

        const catData = await catResponse.json();
        const docData = await docResponse.json();

        setCategories(catData);
        setDocuments(docData);
        if (catData.length > 0) {
          setSelectedCategory(catData[0].id);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, [api]);

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    setError("");

    let url = `${api}/catdokumenpengab/add`;
    let method = "POST";
    if (editCategoryId) {
      url = `${api}/catdokumenpengab/update/${editCategoryId}`;
      method = "PATCH";
    }

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: categoryForm.name }),
        credentials: "include",
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || "Gagal menyimpan kategori.");
      }

      if (editCategoryId) {
        setCategories(
          categories.map((cat) =>
            cat.id === editCategoryId ? responseData : cat
          )
        );
        setEditCategoryId(null);
      } else {
        setCategories([...categories, responseData]);
      }
      setCategoryForm({ name: "" });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCategoryEdit = (category) => {
    setEditCategoryId(category.id);
    setCategoryForm({ name: category.name });
  };

  const handleCategoryDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus kategori?")) {
      try {
        const response = await fetch(`${api}/catdokumenpengab/delete/${id}`, {
          method: "DELETE",
          credentials: "include",
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Gagal menghapus kategori.");
        }
        setCategories(categories.filter((cat) => cat.id !== id));
        setDocuments(documents.filter((doc) => doc.catdokumenpengabId !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleDocumentSubmit = async (e) => {
    e.preventDefault();
    setError("");

    let url = `${api}/dokumenpengab/add`;
    let method = "POST";
    let body = { ...docForm, catdokumenpengabId: selectedCategory };

    if (editDocId) {
      url = `${api}/dokumenpengab/update/${editDocId}`;
      method = "PATCH";
      body = docForm;
    }

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || "Gagal menyimpan dokumen.");
      }

      if (editDocId) {
        setDocuments(
          documents.map((doc) => (doc.id === editDocId ? responseData : doc))
        );
        setEditDocId(null);
      } else {
        setDocuments([...documents, responseData]);
      }
      setDocForm({ file_name: "", file_url: "", catdokumenpengabId: "" });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDocumentEdit = (doc) => {
    setEditDocId(doc.id);
    setDocForm({
      file_name: doc.file_name,
      file_url: doc.file_url,
      catdokumenpengabId: doc.catdokumenpengabId,
    });
  };

  const handleDocumentDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus dokumen ini?")) {
      try {
        const response = await fetch(`${api}/dokumenpengab/delete/${id}`, {
          method: "DELETE",
          credentials: "include",
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Gagal menghapus dokumen.");
        }
        setDocuments(documents.filter((doc) => doc.id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditDocId(null);
    setDocForm({ file_name: "", file_url: "", catdokumenpengabId: "" });
  };

  const filteredDocuments = documents.filter(
    (doc) => doc.catdokumenpengabId === selectedCategory
  );

  return (
    <div style={{ padding: "20px" }}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading ? (
        <p>Memuat data...</p>
      ) : (
        <>
          {/* --- CRUD KATEGORI --- */}
          <div
            style={{
              background: "#e3f2fd",
              padding: 16,
              borderRadius: 8,
              marginBottom: 24,
            }}
          >
            <h3>Kelola Kategori Dokumen Pengabdian</h3>
            <form onSubmit={handleCategorySubmit} style={{ marginBottom: 16 }}>
              <input
                placeholder="Nama Kategori"
                value={categoryForm.name}
                onChange={(e) => setCategoryForm({ name: e.target.value })}
                required
              />
              <button type="submit">
                {editCategoryId ? "Update" : "Tambah"} Kategori
              </button>
              {editCategoryId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditCategoryId(null);
                    setCategoryForm({ name: "" });
                  }}
                >
                  Batal
                </button>
              )}
            </form>
            <table border="1" cellPadding="8" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>Nama Kategori</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat.id}>
                    <td>{cat.name}</td>
                    <td>
                      <button onClick={() => handleCategoryEdit(cat)}>
                        Edit
                      </button>
                      <button onClick={() => handleCategoryDelete(cat.id)}>
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <hr style={{ margin: "40px 0" }} />

          {/* --- CRUD DOKUMEN --- */}
          <h3>Dokumen Pengabdian</h3>
          <div style={{ marginBottom: 16 }}>
            <label>Pilih Kategori:&nbsp;</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(Number(e.target.value))}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <form onSubmit={handleDocumentSubmit} style={{ marginBottom: 16 }}>
            <input
              placeholder="Judul Dokumen"
              value={docForm.file_name}
              onChange={(e) =>
                setDocForm({ ...docForm, file_name: e.target.value })
              }
              required
            />
            <input
              placeholder="Link Google Drive"
              type="url"
              value={docForm.file_url}
              onChange={(e) =>
                setDocForm({ ...docForm, file_url: e.target.value })
              }
              required
            />
            {editDocId && (
              <div style={{ marginTop: "10px" }}>
                <label>Pindahkan ke Kategori:&nbsp;</label>
                <select
                  value={docForm.catdokumenpengabId}
                  onChange={(e) =>
                    setDocForm({
                      ...docForm,
                      catdokumenpengabId: Number(e.target.value),
                    })
                  }
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <button type="submit">
              {editDocId ? "Update" : "Tambah"} Dokumen
            </button>
            {editDocId && (
              <button type="button" onClick={handleCancelEdit}>
                Batal
              </button>
            )}
          </form>
          <table border="1" cellPadding="8" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>No</th>
                <th>Judul</th>
                <th>Link</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.length > 0 ? (
                filteredDocuments.map((doc, idx) => (
                  <tr key={doc.id}>
                    <td>{idx + 1}</td>
                    <td>{doc.file_name}</td>
                    <td>
                      <a
                        href={doc.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Lihat
                      </a>
                    </td>
                    <td>
                      <button onClick={() => handleDocumentEdit(doc)}>
                        Edit
                      </button>
                      <button onClick={() => handleDocumentDelete(doc.id)}>
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    Tidak ada dokumen di kategori ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default CrudDokumenPengabdian;
