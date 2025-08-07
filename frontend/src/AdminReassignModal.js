// components/AdminReassignModal.js

import React, { useState } from 'react';

const AdminReassignModal = ({ isOpen, onClose, players, onConfirm }) => {
  const [selectedAdminId, setSelectedAdminId] = useState('');

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Reassign Team Admin</h2>
        <p>
          This user is the Admin of this Team. From the list, please select the new Admin.
        </p>

        <select
          value={selectedAdminId}
          onChange={(e) => setSelectedAdminId(e.target.value)}
        >
          <option value="">Select a new admin</option>
          {players.map(player => (
            <option key={player.id} value={player.id}>
              {player.firstName} {player.lastName} ({player.username})
            </option>
          ))}
        </select>

        <div className="modal-actions">
          <button onClick={() => onConfirm(selectedAdminId)} disabled={!selectedAdminId}>
            Confirm
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AdminReassignModal;
