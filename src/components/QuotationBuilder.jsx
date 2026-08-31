import { useState, useRef } from 'react';
import { Download, Plus, Trash2, FileText } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function QuotationBuilder() {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventType, setEventType] = useState('');
  const [venue, setVenue] = useState('');
  
  const [items, setItems] = useState([
    { id: 1, description: 'Event Management Services', quantity: 1, rate: 50000 },
    { id: 2, description: 'Venue Decoration', quantity: 1, rate: 35000 }
  ]);
  
  const [taxRate, setTaxRate] = useState(18); // default GST
  const [discount, setDiscount] = useState(0);
  const [notes, setNotes] = useState('50% advance payment required for confirmation.\nValidity of this quotation is 15 days.');
  
  const previewRef = useRef(null);

  const handleAddItem = () => {
    const newItem = {
      id: Date.now(),
      description: '',
      quantity: 1,
      rate: 0
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleItemChange = (id, field, value) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const subtotal = items.reduce((acc, item) => acc + (item.quantity * item.rate), 0);
  const taxAmount = (subtotal * taxRate) / 100;
  const total = subtotal + taxAmount - discount;

  const downloadPDF = async () => {
    if (!previewRef.current) return;
    
    try {
      // Create a canvas from the preview container
      const canvas = await html2canvas(previewRef.current, {
        scale: 2, // Higher resolution
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      
      // Calculate PDF dimensions (A4 size: 210 x 297 mm)
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Quotation_${clientName.replace(/\s+/g, '_') || 'AtithiEvents'}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px', alignItems: 'start' }}>
      
      {/* LEFT PANEL: Editor */}
      <div className="glass" style={{ padding: '24px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '20px', maxHeight: '80vh', overflowY: 'auto' }}>
        <h2 style={{ color: '#fff', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
          <FileText color="#d4af37" />
          Quotation Details
        </h2>
        
        {/* Client Details */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', color: '#a3a3a3', fontSize: '0.875rem', marginBottom: '4px' }}>Client Name</label>
            <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="e.g. Rahul Sharma" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: '#fff' }} />
          </div>
          <div>
            <label style={{ display: 'block', color: '#a3a3a3', fontSize: '0.875rem', marginBottom: '4px' }}>Phone</label>
            <input type="text" value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} placeholder="e.g. +91 9876543210" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: '#fff' }} />
          </div>
          <div>
            <label style={{ display: 'block', color: '#a3a3a3', fontSize: '0.875rem', marginBottom: '4px' }}>Event Type</label>
            <input type="text" value={eventType} onChange={(e) => setEventType(e.target.value)} placeholder="e.g. Wedding Reception" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: '#fff' }} />
          </div>
          <div>
            <label style={{ display: 'block', color: '#a3a3a3', fontSize: '0.875rem', marginBottom: '4px' }}>Event Date</label>
            <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: '#fff' }} />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <label style={{ display: 'block', color: '#a3a3a3', fontSize: '0.875rem', marginBottom: '4px' }}>Venue</label>
            <input type="text" value={venue} onChange={(e) => setVenue(e.target.value)} placeholder="e.g. Taj Palace, Mumbai" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: '#fff' }} />
          </div>
        </div>

        <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: 0 }} />

        {/* Items */}
        <div>
          <h3 style={{ color: '#fff', fontSize: '1rem', marginBottom: '12px' }}>Line Items</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {items.map((item) => (
              <div key={item.id} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input 
                  type="text" 
                  value={item.description} 
                  onChange={(e) => handleItemChange(item.id, 'description', e.target.value)} 
                  placeholder="Item description" 
                  style={{ flex: 2, minWidth: '100px', padding: '8px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: '#fff' }} 
                />
                <input 
                  type="number" 
                  value={item.quantity} 
                  onChange={(e) => handleItemChange(item.id, 'quantity', Number(e.target.value))} 
                  placeholder="Qty" 
                  style={{ width: '60px', padding: '8px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: '#fff' }} 
                />
                <input 
                  type="number" 
                  value={item.rate} 
                  onChange={(e) => handleItemChange(item.id, 'rate', Number(e.target.value))} 
                  placeholder="Rate" 
                  style={{ width: '90px', padding: '8px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: '#fff' }} 
                />
                <button onClick={() => handleRemoveItem(item.id)} style={{ padding: '8px', background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
          <button onClick={handleAddItem} style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.05)', color: '#fff', padding: '8px 16px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', cursor: 'pointer' }}>
            <Plus size={16} /> Add Item
          </button>
        </div>

        <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: 0 }} />

        {/* Totals & Notes */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', color: '#a3a3a3', fontSize: '0.875rem', marginBottom: '4px' }}>Tax Rate (%)</label>
            <input type="number" value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value))} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: '#fff' }} />
          </div>
          <div>
            <label style={{ display: 'block', color: '#a3a3a3', fontSize: '0.875rem', marginBottom: '4px' }}>Discount (₹)</label>
            <input type="number" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: '#fff' }} />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <label style={{ display: 'block', color: '#a3a3a3', fontSize: '0.875rem', marginBottom: '4px' }}>Terms & Notes</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: '#fff' }} />
          </div>
        </div>

      </div>


      {/* RIGHT PANEL: Preview & Download */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <button 
          onClick={downloadPDF}
          style={{ 
            display: 'flex', alignItems: 'center', justifySelf: 'start', gap: '8px', 
            background: 'var(--accent-gold)', color: '#000', padding: '12px 24px', 
            borderRadius: '8px', border: 'none', fontWeight: 600, cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(212, 175, 55, 0.3)', width: 'fit-content'
          }}
        >
          <Download size={20} /> Download PDF
        </button>

        {/* Actual A4 container to be captured */}
        <div style={{ background: '#fff', borderRadius: '8px', overflowX: 'auto', border: '1px solid rgba(255,255,255,0.2)' }}>
          <div 
            ref={previewRef}
            style={{
              width: '210mm',
              minHeight: '297mm',
              padding: '40px',
              background: '#ffffff',
              color: '#333333',
              fontFamily: 'Arial, sans-serif',
              boxSizing: 'border-box'
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #d4af37', paddingBottom: '20px', marginBottom: '30px' }}>
              <div>
                <h1 style={{ fontSize: '28px', margin: '0 0 5px 0', color: '#1a1a1a', letterSpacing: '1px' }}>ATITHI EVENTS</h1>
                <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>Making your moments magical</p>
                <div style={{ marginTop: '15px', fontSize: '13px', color: '#444' }}>
                  <p style={{ margin: '2px 0' }}>Mumbai, Maharashtra, India</p>
                  <p style={{ margin: '2px 0' }}>+91 99999 99999</p>
                  <p style={{ margin: '2px 0' }}>contact@atithievents.in</p>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <h2 style={{ fontSize: '24px', margin: '0 0 10px 0', color: '#d4af37', fontWeight: 'normal' }}>QUOTATION</h2>
                <table style={{ fontSize: '13px', marginLeft: 'auto' }}>
                  <tbody>
                    <tr>
                      <td style={{ padding: '2px 10px 2px 0', color: '#666' }}>Date:</td>
                      <td style={{ fontWeight: 'bold' }}>{new Date().toLocaleDateString()}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '2px 10px 2px 0', color: '#666' }}>Quote #:</td>
                      <td style={{ fontWeight: 'bold' }}>QT-{new Date().getTime().toString().slice(-6)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Client Info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '14px', color: '#d4af37', margin: '0 0 8px 0', textTransform: 'uppercase' }}>Quotation For:</h3>
                <p style={{ margin: '0 0 4px 0', fontWeight: 'bold', fontSize: '15px' }}>{clientName || 'Client Name'}</p>
                {clientPhone && <p style={{ margin: '0 0 4px 0', fontSize: '13px' }}>{clientPhone}</p>}
              </div>
              <div style={{ flex: 1, textAlign: 'right' }}>
                <h3 style={{ fontSize: '14px', color: '#d4af37', margin: '0 0 8px 0', textTransform: 'uppercase' }}>Event Details:</h3>
                {eventType && <p style={{ margin: '0 0 4px 0', fontSize: '13px' }}><strong>Event:</strong> {eventType}</p>}
                {eventDate && <p style={{ margin: '0 0 4px 0', fontSize: '13px' }}><strong>Date:</strong> {eventDate}</p>}
                {venue && <p style={{ margin: '0 0 4px 0', fontSize: '13px' }}><strong>Venue:</strong> {venue}</p>}
              </div>
            </div>

            {/* Items Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: '#f8f8f8', borderBottom: '2px solid #333' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Description</th>
                  <th style={{ padding: '12px', textAlign: 'center', width: '80px' }}>Qty</th>
                  <th style={{ padding: '12px', textAlign: 'right', width: '120px' }}>Rate (₹)</th>
                  <th style={{ padding: '12px', textAlign: 'right', width: '120px' }}>Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px' }}>{item.description || '-'}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>{item.quantity}</td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>{item.rate.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>{(item.quantity * item.rate).toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '40px' }}>
              <table style={{ width: '300px', fontSize: '14px' }}>
                <tbody>
                  <tr>
                    <td style={{ padding: '8px', color: '#666' }}>Subtotal:</td>
                    <td style={{ padding: '8px', textAlign: 'right', fontWeight: 'bold' }}>₹ {subtotal.toLocaleString('en-IN')}</td>
                  </tr>
                  {taxRate > 0 && (
                    <tr>
                      <td style={{ padding: '8px', color: '#666' }}>Tax ({taxRate}%):</td>
                      <td style={{ padding: '8px', textAlign: 'right' }}>₹ {taxAmount.toLocaleString('en-IN')}</td>
                    </tr>
                  )}
                  {discount > 0 && (
                    <tr>
                      <td style={{ padding: '8px', color: '#666' }}>Discount:</td>
                      <td style={{ padding: '8px', textAlign: 'right', color: '#ef4444' }}>- ₹ {discount.toLocaleString('en-IN')}</td>
                    </tr>
                  )}
                  <tr style={{ borderTop: '2px solid #333' }}>
                    <td style={{ padding: '12px 8px', fontWeight: 'bold', fontSize: '16px' }}>Total Amount:</td>
                    <td style={{ padding: '12px 8px', textAlign: 'right', fontWeight: 'bold', fontSize: '16px', color: '#d4af37' }}>
                      ₹ {total.toLocaleString('en-IN')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Notes */}
            <div style={{ marginTop: 'auto', padding: '20px', background: '#f8f8f8', borderRadius: '4px', borderLeft: '4px solid #d4af37' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#333' }}>Terms & Conditions</h4>
              <p style={{ margin: 0, fontSize: '12px', color: '#666', whiteSpace: 'pre-line' }}>{notes}</p>
            </div>
            
            {/* Footer */}
            <div style={{ textAlign: 'center', marginTop: '40px', fontSize: '11px', color: '#999', borderTop: '1px solid #eee', paddingTop: '20px' }}>
              This is a computer generated quotation and does not require a physical signature.
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
