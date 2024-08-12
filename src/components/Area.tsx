import React, { useState, useEffect } from 'react';
import { Modal } from 'bootstrap';
import { getAreas, createArea, updateArea, deleteArea } from '../services/areaService';
import { getZones } from '../services/zoneService';
import { IArea } from '../interfaces/Area';
import { IZone } from '../interfaces/Zone';

const Area: React.FC = () => {
  const [areas, setAreas] = useState<IArea[]>([]);
  const [zones, setZones] = useState<IZone[]>([]);
  const [selectedArea, setSelectedArea] = useState<IArea | null>(null);

  useEffect(() => {
    fetchAreas();
    fetchZones();
  }, []);

  const fetchAreas = async () => {
    const result = await getAreas();
    setAreas(result);
  };

  const fetchZones = async () => {
    const result = await getZones();
    setZones(result);
  };

  const handleSelectArea = (area: IArea) => {
    setSelectedArea(area);
    openModal();
  };

  const handleCreateOrUpdate = async () => {
    if (selectedArea?.id) {
      await updateArea(selectedArea.id, selectedArea);
    } else {
      await createArea(selectedArea!);
    }
    fetchAreas();
    setSelectedArea(null);
    closeModal();
  };

  const handleDelete = async (id: number) => {
    await deleteArea(id);
    fetchAreas();
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

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h2>Areas</h2>
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
                    <button className="btn btn-sm btn-info mr-2" onClick={() => handleSelectArea(area)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(area.id!)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
