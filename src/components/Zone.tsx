import React, { useState, useEffect } from 'react';
import { Modal } from 'bootstrap';
import { getZones, createZone, updateZone, deleteZone } from '../services/zoneService';
import { IZone } from '../interfaces/Zone';
import Pagination from './Pagination'; // Ensure Pagination is imported
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import icons

const Zone: React.FC = () => {
  const [zones, setZones] = useState<IZone[]>([]);
  const [selectedZone, setSelectedZone] = useState<IZone | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    fetchZones(currentPage);
  }, [currentPage]);

  const fetchZones = async (page: number) => {
    try {
      const result = await getZones(page, searchText);
      setZones(result.data);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error('Error fetching zones:', error);
      setZones([]);
      setTotalPages(1);
    }
  };

  const handleSelectZone = (zone: IZone) => {
    setSelectedZone(zone);
    openModal();
  };

  const handleCreateOrUpdate = async () => {
    if (selectedZone?.id) {
      await updateZone(selectedZone.id, selectedZone);
    } else {
      await createZone(selectedZone!);
    }
    fetchZones(currentPage);
    setSelectedZone(null);
    closeModal();
  };

  const handleDelete = async (id: number) => {
    await deleteZone(id);
    fetchZones(currentPage);
  };

  const handleCreateNew = () => {
    setSelectedZone({ id: 0, name: '' });
    openModal();
  };

  const openModal = () => {
    const modalElement = document.getElementById('zoneModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  };

  const closeModal = () => {
    const modalElement = document.getElementById('zoneModal');
    if (modalElement) {
      const modalInstance = Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      }
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchZones(1);
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h2>Zones</h2>
          <div className="row">
            <div className="col-md-10">
              <input
                type="text"
                className="form-control"
                placeholder="Search by Zone name"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <button className="btn btn-primary" onClick={handleSearch}>Search</button>
            </div>
          </div>
        </div>
        <div className="card-body">
          <button className="btn btn-primary mb-3" onClick={handleCreateNew}>Create Zone</button>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Serial No</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {zones.map((zone, index) => (
                <tr key={zone.id}>
                  <td>{index + 1}</td>
                  <td>{zone.name}</td>
                  <td>
                    <button className="btn btn-sm btn-info mr-2" onClick={() => handleSelectZone(zone)}>
                      <FaEdit />
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(zone.id!)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page: number) => setCurrentPage(page)} // Explicitly define the type as number
          />
        </div>
      </div>

      <div className="modal fade" id="zoneModal" tabIndex={-1} aria-labelledby="zoneModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="zoneModalLabel">
                {selectedZone?.id ? 'Edit' : 'Create'} Zone
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Zone Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Zone Name"
                  value={selectedZone?.name || ''}
                  onChange={(e) => setSelectedZone({ ...selectedZone!, name: e.target.value })}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-success" onClick={handleCreateOrUpdate}>
                {selectedZone?.id ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Zone;