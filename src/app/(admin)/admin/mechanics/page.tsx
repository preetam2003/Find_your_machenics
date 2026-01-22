'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/components/ui/Modal';
import { Textarea } from '@/components/ui/Textarea';
import { LoadingSpinner } from '@/components/ui/Loading';

interface MechanicShop {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  vehicleTypes: string[];
  createdAt: string;
  owner: {
    name: string;
    email: string;
    phone: string;
  };
}

export default function AdminMechanicsPage() {
  const searchParams = useSearchParams();
  const statusFilter = searchParams.get('status') || 'all';

  const [mechanics, setMechanics] = useState<MechanicShop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMechanic, setSelectedMechanic] = useState<MechanicShop | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchMechanics = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') {
        params.set('status', statusFilter);
      }
      const response = await fetch(`/api/admin/mechanics?${params}`);
      const data = await response.json();
      if (data.success) {
        setMechanics(data.data);
      }
    } catch (error) {
      console.error('Error fetching mechanics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMechanics();
  }, [statusFilter]);

  const handleAction = async () => {
    if (!selectedMechanic || !actionType) return;

    setIsSubmitting(true);
    try {
      const endpoint = actionType === 'approve' 
        ? `/api/admin/mechanics/${selectedMechanic.id}/approve`
        : `/api/admin/mechanics/${selectedMechanic.id}/reject`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: rejectionReason }),
      });

      const data = await response.json();
      if (data.success) {
        fetchMechanics();
        setIsModalOpen(false);
        setSelectedMechanic(null);
        setActionType(null);
        setRejectionReason('');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openActionModal = (mechanic: MechanicShop, action: 'approve' | 'reject') => {
    setSelectedMechanic(mechanic);
    setActionType(action);
    setIsModalOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return <Badge variant="success">Approved</Badge>;
      case 'REJECTED':
        return <Badge variant="danger">Rejected</Badge>;
      default:
        return <Badge variant="warning">Pending</Badge>;
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Mechanic Shops</h1>
        <p className="text-gray-600 mt-1">Manage mechanic shop registrations</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {['all', 'PENDING', 'APPROVED', 'REJECTED'].map((status) => (
          <a
            key={status}
            href={`/admin/mechanics${status !== 'all' ? `?status=${status}` : ''}`}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              statusFilter === status || (status === 'all' && statusFilter === 'all')
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {status === 'all' ? 'All' : status.charAt(0) + status.slice(1).toLowerCase()}
          </a>
        ))}
      </div>

      {/* Mechanics List */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : mechanics.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-gray-500">
            No mechanic shops found
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {mechanics.map((mechanic) => (
            <Card key={mechanic.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{mechanic.name}</h3>
                      {getStatusBadge(mechanic.status)}
                    </div>
                    <p className="text-gray-600 text-sm mb-2">
                      {mechanic.address}, {mechanic.city}, {mechanic.state}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span>Owner: {mechanic.owner.name}</span>
                      <span>Email: {mechanic.owner.email}</span>
                      <span>Phone: {mechanic.phone}</span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      {mechanic.vehicleTypes.map((type) => (
                        <span
                          key={type}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                        >
                          {type === 'TWO_WHEELER' ? '2-Wheeler' : '4-Wheeler'}
                        </span>
                      ))}
                    </div>
                  </div>
                  {mechanic.status === 'PENDING' && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => openActionModal(mechanic, 'approve')}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => openActionModal(mechanic, 'reject')}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Action Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalHeader onClose={() => setIsModalOpen(false)}>
          {actionType === 'approve' ? 'Approve Shop' : 'Reject Shop'}
        </ModalHeader>
        <ModalBody>
          <p className="text-gray-600 mb-4">
            Are you sure you want to {actionType} <strong>{selectedMechanic?.name}</strong>?
          </p>
          {actionType === 'reject' && (
            <Textarea
              label="Rejection Reason"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Please provide a reason for rejection..."
            />
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button
            variant={actionType === 'approve' ? 'primary' : 'danger'}
            onClick={handleAction}
            isLoading={isSubmitting}
          >
            {actionType === 'approve' ? 'Approve' : 'Reject'}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
