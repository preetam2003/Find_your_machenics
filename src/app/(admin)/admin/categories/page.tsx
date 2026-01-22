'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/components/ui/Modal';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { LoadingSpinner } from '@/components/ui/Loading';

interface Category {
  id: string;
  name: string;
  description: string | null;
  vehicleType: 'TWO_WHEELER' | 'FOUR_WHEELER';
  isActive: boolean;
  _count?: {
    services: number;
  };
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [vehicleType, setVehicleType] = useState<'TWO_WHEELER' | 'FOUR_WHEELER'>('TWO_WHEELER');

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/categories');
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openCreateModal = () => {
    setEditingCategory(null);
    setName('');
    setDescription('');
    setVehicleType('TWO_WHEELER');
    setIsModalOpen(true);
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setName(category.name);
    setDescription(category.description || '');
    setVehicleType(category.vehicleType);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const endpoint = editingCategory
        ? `/api/admin/categories/${editingCategory.id}`
        : '/api/admin/categories';
      
      const method = editingCategory ? 'PATCH' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, vehicleType }),
      });

      const data = await response.json();
      if (data.success) {
        fetchCategories();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    try {
      const response = await fetch(`/api/admin/categories/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
        fetchCategories();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const toggleActive = async (category: Category) => {
    try {
      const response = await fetch(`/api/admin/categories/${category.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !category.isActive }),
      });
      const data = await response.json();
      if (data.success) {
        fetchCategories();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const columns = [
    {
      key: 'name',
      header: 'Name',
      render: (category: Category) => (
        <span className="font-medium text-gray-900">{category.name}</span>
      ),
    },
    {
      key: 'vehicleType',
      header: 'Vehicle Type',
      render: (category: Category) => (
        <span className="text-gray-600">
          {category.vehicleType === 'TWO_WHEELER' ? '2-Wheeler' : '4-Wheeler'}
        </span>
      ),
    },
    {
      key: 'description',
      header: 'Description',
      render: (category: Category) => (
        <span className="text-gray-500 text-sm">{category.description || '-'}</span>
      ),
    },
    {
      key: 'isActive',
      header: 'Status',
      render: (category: Category) => (
        <Badge variant={category.isActive ? 'success' : 'default'}>
          {category.isActive ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (category: Category) => (
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" onClick={() => openEditModal(category)}>
            Edit
          </Button>
          <Button size="sm" variant="ghost" onClick={() => toggleActive(category)}>
            {category.isActive ? 'Disable' : 'Enable'}
          </Button>
          <Button size="sm" variant="ghost" className="text-red-600" onClick={() => handleDelete(category.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600 mt-1">Manage service categories</p>
        </div>
        <Button onClick={openCreateModal}>Add Category</Button>
      </div>

      <Card>
        {isLoading ? (
          <CardContent className="py-12 flex justify-center">
            <LoadingSpinner size="lg" />
          </CardContent>
        ) : (
          <Table
            data={categories}
            columns={columns}
            keyExtractor={(item) => item.id}
            emptyMessage="No categories found"
          />
        )}
      </Card>

      {/* Create/Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleSubmit}>
          <ModalHeader onClose={() => setIsModalOpen(false)}>
            {editingCategory ? 'Edit Category' : 'Create Category'}
          </ModalHeader>
          <ModalBody className="space-y-4">
            <Input
              label="Category Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Engine Repair"
              required
            />
            <Textarea
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of this category"
            />
            <Select
              label="Vehicle Type"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value as 'TWO_WHEELER' | 'FOUR_WHEELER')}
              options={[
                { value: 'TWO_WHEELER', label: '2-Wheeler' },
                { value: 'FOUR_WHEELER', label: '4-Wheeler' },
              ]}
            />
          </ModalBody>
          <ModalFooter>
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              {editingCategory ? 'Update' : 'Create'}
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
}
