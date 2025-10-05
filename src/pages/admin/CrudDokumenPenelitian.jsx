import { useState, useEffect, useCallback } from "react";

const api = import.meta.env.VITE_API_URL;

const CrudDokumenPenelitian = () => {
  const [categories, setCategories] = useState([]);
  const [documents, setDocuments] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [docForm, setDocForm] = useState({
    file_name: "",
    file_url: "",
    catdokumenpenId: "",
  });
  const [editDocId, setEditDocId] = useState(null);

  const [categoryForm, setCategoryForm] = useState({ name: "" });
  const [editCategoryId, setEditCategoryId] = useState(null);

  // --- PAGINATION STATE ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  // -------------------------

  const fetchAllData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [catResponse, docResponse] = await Promise.all([
        fetch(`${api}/catdokumenpen`),
        fetch(`${api}/dokumenpen`),
      ]);

      if (!catResponse.ok || !docResponse.ok) {
        throw new Error("Gagal memuat data dari server.");
      }

      const catData = await catResponse.json();
      const docData = await docResponse.json();

      setCategories(catData);
      setDocuments(docData);

      const currentCategoryExists = catData.some(
        (cat) => cat.id === selectedCategory
      );
      if (!currentCategoryExists && catData.length > 0) {
        setSelectedCategory(catData[0].id);
      } else if (catData.length === 0) {
        setSelectedCategory("");
      } else if (!selectedCategory && catData.length > 0) {
        setSelectedCategory(catData[0].id);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [api, selectedCategory]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Reset page to 1 when the category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    setError("");
    const url = editCategoryId
      ? `${api}/catdokumenpen/update/${editCategoryId}`
      : `${api}/catdokumenpen/add`;
    const method = editCategoryId ? "PATCH" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: categoryForm.name }),
        credentials: "include",
      });
      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message || "Gagal menyimpan kategori.");
      }
      await fetchAllData();
      setCategoryForm({ name: "" });
      setEditCategoryId(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCategoryEdit = (category) => {
    setEditCategoryId(category.id);
    setCategoryForm({ name: category.name });
  };

  const handleCategoryDelete = async (id) => {
    if (
      window.confirm("Yakin ingin menghapus kategori beserta semua isinya?")
    ) {
      try {
        const response = await fetch(`${api}/catdokumenpen/delete/${id}`, {
          method: "DELETE",
          credentials: "include",
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Gagal menghapus kategori.");
        }
        await fetchAllData();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleDocumentSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const isEditMode = !!editDocId;
    const url = isEditMode
      ? `${api}/dokumenpen/update/${editDocId}`
      : `${api}/dokumenpen/add`;
    const method = isEditMode ? "PATCH" : "POST";
    const body = isEditMode
      ? { ...docForm }
      : { ...docForm, catdokumenpenId: selectedCategory };

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      });
      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message || "Gagal menyimpan dokumen.");
      }
      await fetchAllData();
      setDocForm({ file_name: "", file_url: "", catdokumenpenId: "" });
      setEditDocId(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDocumentEdit = (doc) => {
    setEditDocId(doc.id);
    setDocForm({
      file_name: doc.file_name,
      file_url: doc.file_url,
      catdokumenpenId: doc.catdokumenpenId,
    });
  };

  const handleDocumentDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus dokumen ini?")) {
      try {
        const response = await fetch(`${api}/dokumenpen/delete/${id}`, {
          method: "DELETE",
          credentials: "include",
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Gagal menghapus dokumen.");
        }
        await fetchAllData();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditDocId(null);
    setDocForm({ file_name: "", file_url: "", catdokumenpenId: "" });
  };

  const filteredDocuments = documents.filter(
    (doc) => doc.catdokumenpenId === selectedCategory
  );

  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDocuments = filteredDocuments.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{ padding: "20px" }}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading ? (
        <p>Memuat data...</p>
      ) : (
        <>
          <div
            style={{
              background: "#e3f2fd",
              padding: 16,
              borderRadius: 8,
              marginBottom: 24,
            }}
          >
            <h3>Kelola Kategori Dokumen</h3>
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

          <h3>Dokumen Penelitian</h3>
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
                  value={docForm.catdokumenpenId}
                  onChange={(e) =>
                    setDocForm({
                      ...docForm,
                      catdokumenpenId: Number(e.target.value),
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
              {currentDocuments.length > 0 ? (
                currentDocuments.map((doc, idx) => (
                  <tr key={doc.id}>
                    <td>{indexOfFirstItem + idx + 1}</td>
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

          {totalPages > 1 && (
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                &laquo; Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    style={{
                      fontWeight: currentPage === number ? "bold" : "normal",
                      backgroundColor:
                        currentPage === number ? "#e0e0e0" : "white",
                      padding: "5px 10px",
                      border: "1px solid #ccc",
                      cursor: "pointer",
                    }}
                  >
                    {number}
                  </button>
                )
              )}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next &raquo;
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CrudDokumenPenelitian;
