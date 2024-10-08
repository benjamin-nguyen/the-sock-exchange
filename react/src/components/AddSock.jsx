import { useState } from 'react';
import { useAuth } from '../hooks/AuthContext';

const initialFormData = {
  userId: '',
  sockDetails: {
    size: 'Small',
    color: '',
    pattern: '',
    material: '',
    condition: 'New',
    forFoot: 'Left',
  },
  additionalFeatures: {
    waterResistant: false,
    padded: false,
    antiBacterial: false,
  },
  addedTimestamp: new Date().toISOString(),
};

const AddSock = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [submissionMessage, setSubmissionMessage] = useState(''); 
  const { user } = useAuth();

  const clearMessageAfterDelay = (delay = 3000) => {
    setTimeout(() => {
      setSubmissionMessage('');
    }, delay);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => {
      if (name in prev.additionalFeatures) {
        return { 
          ...prev, 
          additionalFeatures: { 
            ...prev.additionalFeatures, 
            [name]: newValue 
          } 
        };
      }
      if (name in prev.sockDetails) {
        return { 
          ...prev, 
          sockDetails: { 
            ...prev.sockDetails, 
            [name]: newValue 
          } 
        };
      }
      return { ...prev, [name]: newValue };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submission = {
        ...formData,
        addedTimestamp: new Date().toISOString(),
        userId: user.uid
    };

    try {
      const response = await fetch(import.meta.env.VITE_SOCKS_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submission),
      });

      if (!response.ok) {
        throw new Error('Failed to add sock');
      }

      setSubmissionMessage('Sock added successfully!');
      setFormData(initialFormData); 
      clearMessageAfterDelay();
    } catch (error) {
      console.error('Error adding sock:', error);
      setSubmissionMessage('Failed to add sock. Please try again.');
      clearMessageAfterDelay();
    }
  };

  return (
    <div>
      {/* Display submission message */}
      {submissionMessage && (
        <div className={`alert ${submissionMessage.includes('successfully') ? 'alert-success' : 'alert-danger'}`}>
          {submissionMessage}
        </div>
      )}

      <form className="p-3" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userId">User ID</label>
          <input
            type="text"
            className="form-control"
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
          />
        </div>

        {/* Sock details */}
        <div className="form-group">
          <label htmlFor="size">Size</label>
          <select className="form-control" id="size" name="size" onChange={handleChange} value={formData.sockDetails.size}>
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="color">Color</label>
          <input type="text" className="form-control" id="color" name="color" onChange={handleChange} value={formData.sockDetails.color} required />
        </div>
        <div className="form-group">
          <label htmlFor="pattern">Pattern</label>
          <input type="text" className="form-control" id="pattern" name="pattern" onChange={handleChange} value={formData.sockDetails.pattern} required />
        </div>
        <div className="form-group">
          <label htmlFor="material">Material</label>
          <input type="text" className="form-control" id="material" name="material" onChange={handleChange} value={formData.sockDetails.material} required />
        </div>
        <div className="form-group">
          <label htmlFor="condition">Condition</label>
          <select className="form-control" id="condition" name="condition" onChange={handleChange} value={formData.sockDetails.condition}>
            <option>New</option>
            <option>Used</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="forFoot">For Foot</label>
          <select className="form-control" id="forFoot" name="forFoot" onChange={handleChange} value={formData.sockDetails.forFoot}>
            <option>Left</option>
            <option>Right</option>
            <option>Both</option>
          </select>
        </div>

        {/* Additional features */}
        <div className="row">
          <div className="form-check col">
            <input className="form-check-input" type="checkbox" id="waterResistant" name="waterResistant" onChange={handleChange} checked={formData.additionalFeatures.waterResistant} />
            <label className="form-check-label" htmlFor="waterResistant">
              Water Resistant
            </label>
          </div>
          <div className="form-check col">
            <input className="form-check-input" type="checkbox" id="padded" name="padded" onChange={handleChange} checked={formData.additionalFeatures.padded} />
            <label className="form-check-label" htmlFor="padded">
              Padded
            </label>
          </div>
          <div className="form-check col">
            <input className="form-check-input" type="checkbox" id="antiBacterial" name="antiBacterial" onChange={handleChange} checked={formData.additionalFeatures.antiBacterial} />
            <label className="form-check-label" htmlFor="antiBacterial">
              Anti Bacterial
            </label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddSock;
