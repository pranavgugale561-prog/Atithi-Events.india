import { useState, useRef, useEffect } from 'react';
import { Download, Plus, Trash2, FileText, Receipt } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const FIRM = {
  name: 'ATITHI EVENTS',
  tagline: 'Making Your Moments Magical',
  address: 'Mumbai, Maharashtra, India',
  phone: '+91 80805 31468',
  email: 'atithieventsservice@gmail.com',
  website: 'atithi-events-india-p2e8.vercel.app',
  logo: '/logo.png',
  qr: '/upi-qr.png',
  bank: {
    accNo: '0546766279',
    ifsc: 'KKBK0002035',
    branch: 'AHMADNAGAR',
    upi: '8080531468@kotakbank'
  }
};

export default function QuotationBuilder() {
  const [docType, setDocType] = useState('quotation');
  const isInvoice = docType === 'invoice';

  const [clientName,  setClientName]  = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [eventDate,   setEventDate]   = useState('');
  const [eventType,   setEventType]   = useState('');
  const [venue,       setVenue]       = useState('');
  const [dueDate,     setDueDate]     = useState('');
  const [payStatus,   setPayStatus]   = useState('Unpaid');

  const [items, setItems] = useState([
    { id: 1, description: 'Event Management Services', details: 'Full end-to-end event coordination and management', quantity: 1, rate: 50000 },
    { id: 2, description: 'Venue Decoration',          details: 'Floral, lighting & thematic décor setup',          quantity: 1, rate: 35000 },
  ]);

  const [taxRate,  setTaxRate]  = useState(18);
  const [discount, setDiscount] = useState(0);
  const [notes, setNotes] = useState(
    '1. 50% advance payment required to confirm the booking.\n2. Balance payment due 7 days before the event.\n3. This quotation is valid for 15 days from the date of issue.\n4. Cancellation charges may apply as per the agreement.'
  );

  const [baseUrl, setBaseUrl] = useState('');
  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  const previewRef = useRef(null);

  const handleAddItem    = () => setItems(p => [...p, { id: Date.now(), description: '', details: '', quantity: 1, rate: 0 }]);
  const handleRemoveItem = id => setItems(p => p.filter(i => i.id !== id));
  const handleItemChange = (id, f, v) => setItems(p => p.map(i => i.id === id ? { ...i, [f]: v } : i));

  const subtotal  = items.reduce((a, i) => a + i.quantity * i.rate, 0);
  const taxAmount = Math.round((subtotal * taxRate) / 100);
  const total     = subtotal + taxAmount - discount;

  const downloadPDF = async () => {
    if (!previewRef.current) return;
    try {
      const canvas  = await html2canvas(previewRef.current, { scale: 2, useCORS: true, allowTaint: true, logging: false, backgroundColor: '#ffffff' });
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf     = new jsPDF('p', 'mm', 'a4');
      const pdfW    = pdf.internal.pageSize.getWidth();
      const pdfH    = (canvas.height * pdfW) / canvas.width;
      const pageH   = pdf.internal.pageSize.getHeight();
      if (pdfH <= pageH) {
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfW, pdfH);
      } else {
        let y = 0;
        while (y < pdfH) { if (y > 0) pdf.addPage(); pdf.addImage(imgData, 'JPEG', 0, -y, pdfW, pdfH); y += pageH; }
      }
      const prefix = isInvoice ? 'Invoice' : 'Quotation';
      pdf.save(`${prefix}_${clientName.replace(/\s+/g, '_') || 'AtithiEvents'}_${Date.now()}.pdf`);
    } catch (err) { console.error(err); alert('Failed to generate PDF. Please try again.'); }
  };

  const fmt     = n  => '₹ ' + Number(n).toLocaleString('en-IN');
  const refNo   = isInvoice ? `INV-${String(Date.now()).slice(-6)}` : `QT-${String(Date.now()).slice(-6)}`;
  const today   = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
  const inp     = { width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(0,0,0,0.25)', color: '#fff', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' };

  const statusColor = payStatus === 'Paid' ? '#22c55e' : payStatus === 'Partial' ? '#f59e0b' : '#ef4444';

  return (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', minHeight: 0 }}>
      {/* ══════════ LEFT: EDITOR ══════════ */}
      <div className="glass" style={{ flex: '0 0 430px', padding: '24px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '18px', maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ color: '#fff', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
            {isInvoice ? <Receipt color="#d4af37" size={20} /> : <FileText color="#d4af37" size={20} />}
            {isInvoice ? 'Invoice Details' : 'Quotation Details'}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.3)', borderRadius: '999px', padding: '3px', border: '1px solid rgba(255,255,255,0.1)', gap: '2px' }}>
            {['quotation', 'invoice'].map(t => (
              <button
                key={t}
                onClick={() => setDocType(t)}
                style={{
                  padding: '6px 14px', borderRadius: '999px', border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, transition: 'all 0.2s',
                  background: docType === t ? '#d4af37' : 'transparent',
                  color: docType === t ? '#000' : '#888',
                  textTransform: 'capitalize',
                }}
              >{t}</button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {[
            ['Client Name', clientName, setClientName, 'e.g. Rahul Sharma', 'text'],
            ['Phone',       clientPhone, setClientPhone, '+91 98765 43210', 'tel'],
            ['Event Type',  eventType,  setEventType,  'e.g. Wedding', 'text'],
            ['Event Date',  eventDate,  setEventDate,  '', 'date'],
          ].map(([label, val, setter, ph, type]) => (
            <div key={label}>
              <label style={{ display: 'block', color: '#a3a3a3', fontSize: '0.78rem', marginBottom: '4px' }}>{label}</label>
              <input type={type} value={val} onChange={e => setter(e.target.value)} placeholder={ph} style={inp} />
            </div>
          ))}
          <div style={{ gridColumn: 'span 2' }}>
            <label style={{ display: 'block', color: '#a3a3a3', fontSize: '0.78rem', marginBottom: '4px' }}>Venue</label>
            <input type="text" value={venue} onChange={e => setVenue(e.target.value)} placeholder="e.g. Taj Palace, Mumbai" style={inp} />
          </div>

          {isInvoice && (
            <>
              <div>
                <label style={{ display: 'block', color: '#a3a3a3', fontSize: '0.78rem', marginBottom: '4px' }}>Due Date</label>
                <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} style={inp} />
              </div>
              <div>
                <label style={{ display: 'block', color: '#a3a3a3', fontSize: '0.78rem', marginBottom: '4px' }}>Payment Status</label>
                <select value={payStatus} onChange={e => setPayStatus(e.target.value)} style={{ ...inp, appearance: 'none' }}>
                  <option>Unpaid</option>
                  <option>Partial</option>
                  <option>Paid</option>
                </select>
              </div>
            </>
          )}
        </div>

        <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: 0 }} />

        <div>
          <h3 style={{ color: '#fff', fontSize: '0.95rem', margin: '0 0 12px 0' }}>Line Items</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {items.map(item => (
              <div key={item.id} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '8px', padding: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <input type="text" value={item.description} onChange={e => handleItemChange(item.id, 'description', e.target.value)} placeholder="Item name" style={{ ...inp, flex: 1 }} />
                  <button onClick={() => handleRemoveItem(item.id)} style={{ padding: '8px', background: 'rgba(239,68,68,0.15)', color: '#ef4444', border: 'none', borderRadius: '6px', cursor: 'pointer', flexShrink: 0 }}>
                    <Trash2 size={15} />
                  </button>
                </div>
                <textarea value={item.details} onChange={e => handleItemChange(item.id, 'details', e.target.value)} placeholder="Description / details (optional)" rows={2} style={{ ...inp, resize: 'vertical', marginBottom: '8px' }} />
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', color: '#a3a3a3', fontSize: '0.75rem', marginBottom: '3px' }}>Qty</label>
                    <input type="number" value={item.quantity} onChange={e => handleItemChange(item.id, 'quantity', Number(e.target.value))} style={inp} />
                  </div>
                  <div style={{ flex: 2 }}>
                    <label style={{ display: 'block', color: '#a3a3a3', fontSize: '0.75rem', marginBottom: '3px' }}>Rate (₹)</label>
                    <input type="number" value={item.rate} onChange={e => handleItemChange(item.id, 'rate', Number(e.target.value))} style={inp} />
                  </div>
                  <div style={{ flex: 2 }}>
                    <label style={{ display: 'block', color: '#a3a3a3', fontSize: '0.75rem', marginBottom: '3px' }}>Amount</label>
                    <div style={{ ...inp, color: '#d4af37', fontWeight: 600 }}>{fmt(item.quantity * item.rate)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={handleAddItem} style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(212,175,55,0.1)', color: '#d4af37', padding: '8px 16px', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '6px', cursor: 'pointer', fontSize: '0.88rem' }}>
            <Plus size={15} /> Add Item
          </button>
        </div>

        <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: 0 }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', color: '#a3a3a3', fontSize: '0.78rem', marginBottom: '4px' }}>GST / Tax Rate (%)</label>
            <input type="number" value={taxRate} onChange={e => setTaxRate(Number(e.target.value))} style={inp} />
          </div>
          <div>
            <label style={{ display: 'block', color: '#a3a3a3', fontSize: '0.78rem', marginBottom: '4px' }}>Discount (₹)</label>
            <input type="number" value={discount} onChange={e => setDiscount(Number(e.target.value))} style={inp} />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <label style={{ display: 'block', color: '#a3a3a3', fontSize: '0.78rem', marginBottom: '4px' }}>Terms & Conditions</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={4} style={{ ...inp, resize: 'vertical' }} />
          </div>
        </div>

        <div style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '8px', padding: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#aaa', fontSize: '0.85rem', marginBottom: '6px' }}><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#aaa', fontSize: '0.85rem', marginBottom: '6px' }}><span>GST ({taxRate}%)</span><span>{fmt(taxAmount)}</span></div>
          {discount > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ef4444', fontSize: '0.85rem', marginBottom: '6px' }}><span>Discount</span><span>− {fmt(discount)}</span></div>}
          <hr style={{ borderColor: 'rgba(212,175,55,0.3)', margin: '8px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#d4af37', fontSize: '1rem', fontWeight: 700 }}><span>Total</span><span>{fmt(total)}</span></div>
        </div>

        <button onClick={downloadPDF} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'var(--accent-gold)', color: '#000', padding: '13px', borderRadius: '8px', border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: '1rem', boxShadow: '0 4px 14px rgba(212,175,55,0.35)' }}>
          <Download size={20} /> Download {isInvoice ? 'Invoice' : 'Quotation'} PDF
        </button>
      </div>

      {/* ══════════ RIGHT: PDF PREVIEW ══════════ */}
      <div style={{ flex: 1, overflowX: 'auto', maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}>
        <div style={{ background: '#e5e7eb', padding: '16px', borderRadius: '8px', display: 'inline-block', minWidth: '210mm' }}>
          <div
            ref={previewRef}
            style={{ width: '210mm', minHeight: '297mm', background: '#ffffff', fontFamily: '"Helvetica Neue", Arial, sans-serif', color: '#1a1a1a', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}
          >
            {/* ── HEADER ── */}
            <div style={{ background: '#1a1a1a', padding: '24px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {baseUrl && <img src={`${baseUrl}${FIRM.logo}`} crossOrigin="anonymous" alt="Atithi Events" style={{ height: '60px', width: '60px', objectFit: 'contain', borderRadius: '8px', border: '2px solid #d4af37', background: '#000' }} />}
                <div>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: '#d4af37', letterSpacing: '2px' }}>{FIRM.name}</div>
                  <div style={{ fontSize: '11px', color: '#999', letterSpacing: '1px', marginTop: '2px' }}>{FIRM.tagline.toUpperCase()}</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '28px', fontWeight: 300, color: '#ffffff', letterSpacing: '4px' }}>{isInvoice ? 'INVOICE' : 'QUOTATION'}</div>
                <div style={{ fontSize: '12px', color: '#d4af37', marginTop: '4px' }}>#{refNo}</div>
                <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>Date: {today}</div>
                {isInvoice && dueDate && <div style={{ fontSize: '11px', color: '#f87171', marginTop: '2px' }}>Due: {dueDate}</div>}
                {isInvoice && (
                  <div style={{ marginTop: '6px', display: 'inline-block', padding: '3px 10px', borderRadius: '999px', background: statusColor, color: '#fff', fontSize: '11px', fontWeight: 700 }}>
                    {payStatus.toUpperCase()}
                  </div>
                )}
              </div>
            </div>

            <div style={{ height: '3px', background: 'linear-gradient(90deg, #d4af37, #f5e27a, #d4af37)' }} />

            {/* ── BODY ── */}
            <div style={{ padding: '32px 36px', flex: 1, display: 'flex', flexDirection: 'column', gap: '28px' }}>

              {/* FROM / TO */}
              <div style={{ display: 'flex', gap: '24px' }}>
                <div style={{ flex: 1, background: '#f9f9f9', borderRadius: '8px', padding: '16px 20px', borderLeft: '4px solid #d4af37' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: '#d4af37', letterSpacing: '1.5px', marginBottom: '10px' }}>FROM</div>
                  <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '6px' }}>{FIRM.name}</div>
                  <div style={{ fontSize: '12px', color: '#555', lineHeight: '1.9' }}>
                    <div>{FIRM.address}</div>
                    <div>📞 {FIRM.phone}</div>
                    <div>✉ {FIRM.email}</div>
                    <div>🌐 {FIRM.website}</div>
                  </div>
                </div>
                <div style={{ flex: 1, background: '#f9f9f9', borderRadius: '8px', padding: '16px 20px', borderLeft: '4px solid #1a1a1a' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: '#1a1a1a', letterSpacing: '1.5px', marginBottom: '10px' }}>{isInvoice ? 'BILL TO' : 'QUOTATION FOR'}</div>
                  <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '6px' }}>{clientName || 'Client Name'}</div>
                  <div style={{ fontSize: '12px', color: '#555', lineHeight: '1.9' }}>
                    {clientPhone && <div>📞 {clientPhone}</div>}
                    {eventType  && <div>🎉 {eventType}</div>}
                    {eventDate  && <div>📅 {eventDate}</div>}
                    {venue      && <div>📍 {venue}</div>}
                  </div>
                </div>
              </div>

              {/* ITEMS TABLE */}
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: '#1a1a1a' }}>
                    {['#', 'Description', 'Qty', 'Rate (₹)', 'Amount (₹)'].map((h, i) => (
                      <th key={h} style={{ padding: '12px 14px', textAlign: i === 0 ? 'center' : i >= 2 ? 'right' : 'left', color: '#d4af37', fontWeight: 600, fontSize: '11px', letterSpacing: '0.8px', width: i === 0 ? '32px' : i >= 2 ? '90px' : 'auto' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => (
                    <tr key={item.id} style={{ borderBottom: '1px solid #f0f0f0', background: idx % 2 === 0 ? '#fff' : '#fafafa' }}>
                      <td style={{ padding: '14px', textAlign: 'center', color: '#888', fontSize: '12px' }}>{idx + 1}</td>
                      <td style={{ padding: '14px' }}>
                        <div style={{ fontWeight: 600, marginBottom: item.details ? '4px' : 0 }}>{item.description || '—'}</div>
                        {item.details && <div style={{ fontSize: '11px', color: '#777', lineHeight: '1.5' }}>{item.details}</div>}
                      </td>
                      <td style={{ padding: '14px', textAlign: 'right' }}>{item.quantity}</td>
                      <td style={{ padding: '14px', textAlign: 'right' }}>{Number(item.rate).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '14px', textAlign: 'right', fontWeight: 600 }}>{(item.quantity * item.rate).toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* TOTALS */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <table style={{ width: '280px', fontSize: '13px' }}>
                  <tbody>
                    <tr><td style={{ padding: '7px 12px', color: '#555' }}>Subtotal</td><td style={{ padding: '7px 12px', textAlign: 'right', fontWeight: 600 }}>{fmt(subtotal)}</td></tr>
                    {taxRate > 0 && <tr><td style={{ padding: '7px 12px', color: '#555' }}>GST ({taxRate}%)</td><td style={{ padding: '7px 12px', textAlign: 'right' }}>{fmt(taxAmount)}</td></tr>}
                    {discount > 0 && <tr><td style={{ padding: '7px 12px', color: '#ef4444' }}>Discount</td><td style={{ padding: '7px 12px', textAlign: 'right', color: '#ef4444' }}>− {fmt(discount)}</td></tr>}
                    <tr style={{ background: '#1a1a1a' }}>
                      <td style={{ padding: '12px 14px', fontWeight: 700, color: '#fff', fontSize: '14px' }}>{isInvoice ? 'AMOUNT DUE' : 'TOTAL AMOUNT'}</td>
                      <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: 800, color: '#d4af37', fontSize: '15px' }}>{fmt(total)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* T&C + BANK DETAILS (HORIZONTAL) */}
              <div style={{ display: 'flex', gap: '24px', marginTop: 'auto' }}>
                <div style={{ flex: 1.5, background: '#fffbf0', border: '1px solid #f0d882', borderRadius: '8px', padding: '18px 22px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#b8860b', letterSpacing: '1px', marginBottom: '10px' }}>TERMS & CONDITIONS</div>
                  <div style={{ fontSize: '12px', color: '#555', lineHeight: '1.9', whiteSpace: 'pre-line' }}>{notes}</div>
                </div>

                <div style={{ flex: 1, background: '#f9f9f9', border: '1px solid #eee', borderRadius: '8px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#1a1a1a', letterSpacing: '1px', marginBottom: '8px' }}>BANK DETAILS</div>
                    <div style={{ fontSize: '11px', color: '#555', lineHeight: '1.8' }}>
                      <div><span style={{ fontWeight: 600 }}>A/c No:</span> {FIRM.bank.accNo}</div>
                      <div><span style={{ fontWeight: 600 }}>IFSC:</span> {FIRM.bank.ifsc}</div>
                      <div><span style={{ fontWeight: 600 }}>Branch:</span> {FIRM.bank.branch}</div>
                      <div><span style={{ fontWeight: 600 }}>UPI ID:</span> {FIRM.bank.upi}</div>
                    </div>
                  </div>
                  {baseUrl && <img src={`${baseUrl}${FIRM.qr}`} crossOrigin="anonymous" alt="UPI QR Code" style={{ width: '85px', height: '85px', objectFit: 'contain', borderRadius: '6px', border: '1px solid #ddd', padding: '4px', background: '#fff' }} />}
                </div>
              </div>

            </div>

            {/* ── FOOTER ── */}
            <div style={{ background: '#1a1a1a', padding: '14px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '11px', color: '#888' }}>
                This is a computer-generated {isInvoice ? 'invoice' : 'quotation'} — no physical signature required.
              </div>
              <div style={{ fontSize: '11px', color: '#d4af37', textAlign: 'right' }}>
                {FIRM.name} · {FIRM.phone}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
