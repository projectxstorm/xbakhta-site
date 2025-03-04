'use client'

import React, { useState } from 'react';
import { useAdmin } from '@/app/context/AdminContext';
import { FooterContent, FooterLink } from '@/app/context/AdminContext';

// Icons
import { Plus as PlusIcon, X as CloseIcon, Edit as EditIcon, Trash as TrashIcon } from 'lucide-react';

// Form for editing a footer link
const FooterLinkForm = ({ 
  link, 
  onSave, 
  onDelete 
}: { 
  link: FooterLink; 
  onSave: (updatedLink: FooterLink) => void; 
  onDelete: () => void;
}) => {
  const [formData, setFormData] = useState<FooterLink>({...link});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: value}));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-white mb-2">Link Information</h4>
        
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Text</label>
          <input 
            type="text" 
            name="text"
            value={formData.text}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-md"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">URL</label>
          <input 
            type="text" 
            name="url"
            value={formData.url}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-md"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Group</label>
          <select 
            name="group"
            value={formData.group}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-md"
            required
          >
            <option value="company">Company</option>
            <option value="support">Support</option>
            <option value="legal">Legal</option>
            <option value="social">Social</option>
          </select>
        </div>
      </div>
      
      <div className="flex justify-between pt-4 border-t border-gray-700">
        <button
          type="button"
          onClick={onDelete}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-1"
        >
          <TrashIcon className="h-4 w-4" /> Delete
        </button>
        
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

// Main FooterEditor component
const FooterEditor = () => {
  const { footerContent, updateFooter, addFooterLink, updateFooterLink, deleteFooterLink } = useAdmin();
  const [copyrightText, setCopyrightText] = useState(footerContent?.copyright || '© 2023 BlinkBox Studios. All rights reserved.');
  const [selectedLink, setSelectedLink] = useState<string | null>(null);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  
  const currentLink = selectedLink 
    ? footerContent?.links.find(link => link.id === selectedLink) 
    : null;
  
  const openEditLinkModal = (linkId: string) => {
    setSelectedLink(linkId);
    setIsLinkModalOpen(true);
  };
  
  const handleAddNewLink = (group: string) => {
    // Create a new link with default values
    const newId = `link-${Date.now()}`;
    const newLink: FooterLink = {
      id: newId,
      text: 'New Link',
      url: '#',
      group
    };
    
    addFooterLink(newLink);
    openEditLinkModal(newId);
  };
  
  const handleSaveCopyright = () => {
    updateFooter({ 
      ...footerContent,
      copyright: copyrightText 
    });
  };
  
  const handleSaveLink = (updatedLink: FooterLink) => {
    updateFooterLink(updatedLink.id, updatedLink);
    setIsLinkModalOpen(false);
  };
  
  const handleDeleteLink = () => {
    if (currentLink && window.confirm('Are you sure you want to delete this link?')) {
      deleteFooterLink(currentLink.id);
      setIsLinkModalOpen(false);
    }
  };
  
  // Group links by category
  const companyLinks = footerContent?.links.filter(link => link.group === 'company') || [];
  const supportLinks = footerContent?.links.filter(link => link.group === 'support') || [];
  const legalLinks = footerContent?.links.filter(link => link.group === 'legal') || [];
  const socialLinks = footerContent?.links.filter(link => link.group === 'social') || [];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-white">Footer Editor</h3>
      </div>
      
      {/* Copyright Text */}
      <div className="bg-[#161923] rounded-md p-4 mb-4">
        <h4 className="text-lg font-semibold text-white mb-3">Copyright Text</h4>
        <div className="flex items-end gap-4">
          <div className="flex-grow">
            <input 
              type="text" 
              value={copyrightText}
              onChange={(e) => setCopyrightText(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-md"
            />
          </div>
          <button 
            onClick={handleSaveCopyright}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
          >
            Save
          </button>
        </div>
      </div>
      
      {/* Company Links */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-semibold text-white">Company Links</h4>
          <button 
            onClick={() => handleAddNewLink('company')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm flex items-center gap-1"
          >
            <PlusIcon className="h-4 w-4" /> Add Link
          </button>
        </div>
        
        <div className="bg-[#161923] rounded-md p-4 mb-4">
          <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2">
            {companyLinks.length > 0 ? companyLinks.map(link => (
              <div key={link.id} className="bg-[#1c1f2e] rounded-md p-3 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="font-bold text-white">{link.text}</span>
                  <span className="text-sm text-blue-400">{link.url}</span>
                </div>
                <button
                  onClick={() => openEditLinkModal(link.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-1 rounded-md"
                  aria-label="Edit link"
                >
                  <EditIcon className="h-4 w-4" />
                </button>
              </div>
            )) : (
              <p className="text-gray-500 text-center py-4">No company links found.</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Support Links */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-semibold text-white">Support Links</h4>
          <button 
            onClick={() => handleAddNewLink('support')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm flex items-center gap-1"
          >
            <PlusIcon className="h-4 w-4" /> Add Link
          </button>
        </div>
        
        <div className="bg-[#161923] rounded-md p-4 mb-4">
          <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2">
            {supportLinks.length > 0 ? supportLinks.map(link => (
              <div key={link.id} className="bg-[#1c1f2e] rounded-md p-3 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="font-bold text-white">{link.text}</span>
                  <span className="text-sm text-blue-400">{link.url}</span>
                </div>
                <button
                  onClick={() => openEditLinkModal(link.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-1 rounded-md"
                  aria-label="Edit link"
                >
                  <EditIcon className="h-4 w-4" />
                </button>
              </div>
            )) : (
              <p className="text-gray-500 text-center py-4">No support links found.</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Legal Links */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-semibold text-white">Legal Links</h4>
          <button 
            onClick={() => handleAddNewLink('legal')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm flex items-center gap-1"
          >
            <PlusIcon className="h-4 w-4" /> Add Link
          </button>
        </div>
        
        <div className="bg-[#161923] rounded-md p-4 mb-4">
          <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2">
            {legalLinks.length > 0 ? legalLinks.map(link => (
              <div key={link.id} className="bg-[#1c1f2e] rounded-md p-3 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="font-bold text-white">{link.text}</span>
                  <span className="text-sm text-blue-400">{link.url}</span>
                </div>
                <button
                  onClick={() => openEditLinkModal(link.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-1 rounded-md"
                  aria-label="Edit link"
                >
                  <EditIcon className="h-4 w-4" />
                </button>
              </div>
            )) : (
              <p className="text-gray-500 text-center py-4">No legal links found.</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Social Links */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-semibold text-white">Social Links</h4>
          <button 
            onClick={() => handleAddNewLink('social')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm flex items-center gap-1"
          >
            <PlusIcon className="h-4 w-4" /> Add Link
          </button>
        </div>
        
        <div className="bg-[#161923] rounded-md p-4 mb-4">
          <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2">
            {socialLinks.length > 0 ? socialLinks.map(link => (
              <div key={link.id} className="bg-[#1c1f2e] rounded-md p-3 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="font-bold text-white">{link.text}</span>
                  <span className="text-sm text-blue-400">{link.url}</span>
                </div>
                <button
                  onClick={() => openEditLinkModal(link.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-1 rounded-md"
                  aria-label="Edit link"
                >
                  <EditIcon className="h-4 w-4" />
                </button>
              </div>
            )) : (
              <p className="text-gray-500 text-center py-4">No social links found.</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Link Edit Modal */}
      {isLinkModalOpen && currentLink && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1c1f2e] rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h3 className="text-xl font-bold text-white">Edit Link</h3>
              <button onClick={() => setIsLinkModalOpen(false)} className="text-gray-400 hover:text-white">
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-4">
              <FooterLinkForm 
                link={currentLink} 
                onSave={handleSaveLink}
                onDelete={handleDeleteLink}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FooterEditor; 