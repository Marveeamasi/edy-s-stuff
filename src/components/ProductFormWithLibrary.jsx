import { useState } from 'react';
import { useForm } from 'react-hook-form';

export function ProductFormWithLibrary() {
  const [message, setMessage] = useState('');
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

const onSubmit = async (data) => {
    setMessage('');
    
    try {
      const response = await fetch('https://api.oluwasetemi.dev/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          price: Number(data.price),
          description: data.description,
          category: data.category
        })
      });
      
      if (response.ok) {
        setMessage('Product created successfully!');
        reset();
      } else {
        setMessage('Failed to create product. Please try again.');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };
  
  return (
    <div className="form-container">
      <h2>With React Hook Form</h2>
      <div className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Product Name</label>
          <input
            {...register('name', { required: 'Name is required' })}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name.message}</span>}
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            step="0.01"
            {...register('price', { 
              required: 'Price is required',
              validate: value => value > 0 || 'Price must be positive'
            })}
            className={errors.price ? 'error' : ''}
          />
          {errors.price && <span className="error-message">{errors.price.message}</span>}
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            rows="4"
            {...register('description', { required: 'Description is required' })}
            className={errors.description ? 'error' : ''}
          />
          {errors.description && <span className="error-message">{errors.description.message}</span>}
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            {...register('category', { required: 'Category is required' })}
            className={errors.category ? 'error' : ''}
          />
          {errors.category && <span className="error-message">{errors.category.message}</span>}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create Product'}
        </button>
        
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}