'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
  address: yup.string().required(),
  position: yup.string().required(),
  department: yup.string().required(),
  salary: yup.number().required().positive(),
  joinDate: yup.date().required(),
});

export default function AddEmployeePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const res = await fetch('/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Something went wrong');

      alert('Employee added successfully!');
      router.push('/dashboard/admin/employees');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow p-6 rounded">
      <h1 className="text-xl font-bold mb-4">Add New Employee</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>First Name</label>
            <input {...register('firstName')} className="input" />
            <p className="text-red-500 text-sm">{errors.firstName?.message}</p>
          </div>
          <div>
            <label>Last Name</label>
            <input {...register('lastName')} className="input" />
            <p className="text-red-500 text-sm">{errors.lastName?.message}</p>
          </div>
        </div>

        <div>
          <label>Email</label>
          <input {...register('email')} className="input" />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>

        <div>
          <label>Phone</label>
          <input {...register('phone')} className="input" />
          <p className="text-red-500 text-sm">{errors.phone?.message}</p>
        </div>

        <div>
          <label>Address</label>
          <input {...register('address')} className="input" />
          <p className="text-red-500 text-sm">{errors.address?.message}</p>
        </div>

        <div>
          <label>Position</label>
          <input {...register('position')} className="input" />
          <p className="text-red-500 text-sm">{errors.position?.message}</p>
        </div>

        <div>
          <label>Department</label>
          <input {...register('department')} className="input" />
          <p className="text-red-500 text-sm">{errors.department?.message}</p>
        </div>

        <div>
          <label>Salary</label>
          <input type="number" {...register('salary')} className="input" />
          <p className="text-red-500 text-sm">{errors.salary?.message}</p>
        </div>

        <div>
          <label>Join Date</label>
          <input type="date" {...register('joinDate')} className="input" />
          <p className="text-red-500 text-sm">{errors.joinDate?.message}</p>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Employee
        </button>
      </form>
    </div>
  );
}
