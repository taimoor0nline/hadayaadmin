import React, { useState, useEffect } from 'react';
import { Modal } from 'bootstrap';
import { getAreas, createArea, updateArea, deleteArea } from '../services/areaService';
import { getZones } from '../services/zoneService';
import { IArea } from '../interfaces/Area';
import { IZone } from '../interfaces/Zone';
import Pagination from './Pagination';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Area: React.FC = () => {
  const [areas, setAreas] = useState<IArea[]>([]);
  const [zones, setZones] = useState<IZone[]>([]);
  const [selectedArea, setSelectedArea] = useState<IArea | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchBy, setSearchBy] = useState<string>('area');
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    fetchZones();
    fetchAreas(currentPage);
  }, [currentPage]);

  const fetchAreas = async (page: number) => {
    try {
      const result = await getAreas(page, searchBy === 'area' ? searchText : undefined, searchBy === 'zone' ? searchText : undefined);
      setAreas(result.data);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error('Error fetching areas:', error);
      setAreas([]);
      setTotalPages(1);
    }
  };

  const fetchZones = async () => {
    try {
      const result = await getZones(currentPage); // Ensure you pass the current page number
      setZones(Array.isArray(result.data) ? result.data : []);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error('Error fetching zones:', error);
      setZones([]);
    }
  };

  const handleSelectArea = (area: IArea) => {
    setSelectedArea(area);
    openModal();
  };

  interface IAreaPayload {
    id: number;
    name: string;
    zoneId: number;
  }
  
  const handleCreateOrUpdate = async () => {
    if (selectedArea) {
 
      const payload: IAreaPayload = {
        id: selectedArea.id,
        name: selectedArea.name,
        zoneId: selectedArea.zone.id,
      };
  
      if (selectedArea.id) {
        await updateArea(selectedArea.id, payload);
      } else {
        await createArea(payload);
      }
      fetchAreas(currentPage);
      setSelectedArea(null);
      closeModal();
    }
  };

  const handleDelete = async (id: number) => {
    await deleteArea(id);
    fetchAreas(currentPage);
  };

  const handleCreateNew = () => {
    setSelectedArea({ id: 0, name: '', zone: { id: 0, name: '' } });
    openModal();
  };

  const openModal = () => {
    const modalElement = document.getElementById('areaModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  };

  const closeModal = () => {
    const modalElement = document.getElementById('areaModal');
    if (modalElement) {
      const modalInstance = Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      }
    }
  };

  const handleSearch = () => {
    setCurrentPage(1); // Reset to the first page for new search
    fetchAreas(1);
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h2>Areas</h2>
          <div className="row">
            <div className="col-md-4">
              <select
                className="form-control"
                value={searchBy}
                onChange={(e) => setSearchBy(e.target.value)}
              >
                <option value="area">Search by Area</option>
                <option value="zone">Search by Zone</option>
              </select>
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder={`Enter ${searchBy} name`}
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
          <button className="btn btn-primary mb-3" onClick={handleCreateNew}>Create Area</button>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Serial No</th>
                <th>Area Name</th>
                <th>Zone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {areas.map((area, index) => (
                <tr key={area.id}>
                  <td>{index + 1}</td>
                  <td>{area.name}</td>
                  <td>{area.zone.name}</td>
                  <td>
                    <button className="btn btn-sm btn-info mr-2" onClick={() => handleSelectArea(area)}>
                      <FaEdit />
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(area.id!)}>
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
            onPageChange={(page: number) => setCurrentPage(page)}
          />
        </div>
      </div>

      <div className="modal fade" id="areaModal" tabIndex={-1} aria-labelledby="areaModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="areaModalLabel">
                {selectedArea?.id ? 'Edit' : 'Create'} Area
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Area Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Area Name"
                  value={selectedArea?.name || ''}
                  onChange={(e) => setSelectedArea({ ...selectedArea!, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Zone</label>
                <select
                  className="form-control"
                  value={selectedArea?.zone.id || 0}
                  onChange={(e) => setSelectedArea({ ...selectedArea!, zone: zones.find(zone => zone.id === parseInt(e.target.value))! })}
                >
                  <option value={0}>Select Zone</option>
                  {zones.map(zone => (
                    <option key={zone.id} value={zone.id}>{zone.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-success" onClick={handleCreateOrUpdate}>
                {selectedArea?.id ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Area;