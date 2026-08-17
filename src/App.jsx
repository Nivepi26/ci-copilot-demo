import { useState } from 'react';
import { Building2, Mail, Phone, Plus, Search, Trash2, UserRoundPen } from 'lucide-react';

const initialCustomers = [
  {
    id: crypto.randomUUID(),
    name: 'Ava Manufacturing',
    email: 'ops@ava.example',
    phone: '555-0142',
    status: 'Active',
  },
  {
    id: crypto.randomUUID(),
    name: 'Northwind Supply',
    email: 'hello@northwind.example',
    phone: '555-0198',
    status: 'Prospect',
  },
  {
    id: crypto.randomUUID(),
    name: 'Summit Retail Group',
    email: 'care@summit.example',
    phone: '555-0164',
    status: 'Inactive',
  },
];

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  status: 'Active',
};

function App() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [form, setForm] = useState(emptyForm);
  const [query, setQuery] = useState('');

  const filteredCustomers = customers.filter((customer) => {
    const searchText = `${customer.name} ${customer.email} ${customer.phone} ${customer.status}`.toLowerCase();
    return searchText.includes(query.toLowerCase());
  });

  const activeCount = customers.filter((customer) => customer.status === 'Active').length;

  function updateForm(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  }

  function addCustomer(event) {
    event.preventDefault();

    const nextCustomer = {
      id: crypto.randomUUID(),
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      status: form.status,
    };

    if (!nextCustomer.name || !nextCustomer.email || !nextCustomer.phone) {
      return;
    }

    setCustomers((currentCustomers) => [nextCustomer, ...currentCustomers]);
    setForm(emptyForm);
  }

  function removeCustomer(customerId) {
    setCustomers((currentCustomers) => currentCustomers.filter((customer) => customer.id !== customerId));
  }

  return (
    <main className="app-shell">
      <section className="hero-panel" aria-labelledby="page-title">
        <div>
          <span className="eyebrow">Customer desk</span>
          <h1 id="page-title">Manage customer relationships</h1>
          <p>Track customer records, monitor account status, and keep contact details ready for follow-up.</p>
        </div>

        <div className="metrics" aria-label="Customer summary">
          <div>
            <span>{customers.length}</span>
            <small>Total customers</small>
          </div>
          <div>
            <span>{activeCount}</span>
            <small>Active accounts</small>
          </div>
        </div>
      </section>

      <section className="workspace-grid">
        <form className="customer-form" onSubmit={addCustomer} aria-label="Add customer">
          <div className="section-heading">
            <UserRoundPen aria-hidden="true" />
            <h2>Add customer</h2>
          </div>

          <label>
            Name
            <input name="name" value={form.name} onChange={updateForm} placeholder="Company or contact" required />
          </label>
          <label>
            Email
            <input name="email" type="email" value={form.email} onChange={updateForm} placeholder="name@example.com" required />
          </label>
          <label>
            Phone
            <input name="phone" value={form.phone} onChange={updateForm} placeholder="555-0123" required />
          </label>
          <label>
            Status
            <select name="status" value={form.status} onChange={updateForm}>
              <option>Active</option>
              <option>Prospect</option>
              <option>Inactive</option>
            </select>
          </label>

          <button type="submit">
            <Plus aria-hidden="true" />
            Add customer
          </button>
        </form>

        <section className="customer-list" aria-labelledby="customer-list-title">
          <div className="list-header">
            <div className="section-heading">
              <Building2 aria-hidden="true" />
              <h2 id="customer-list-title">Customers</h2>
            </div>
            <label className="search-box">
              <Search aria-hidden="true" />
              <span className="sr-only">Search customers</span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search customers" />
            </label>
          </div>

          <div className="customer-cards">
            {filteredCustomers.map((customer) => (
              <article className="customer-card" key={customer.id}>
                <div className="customer-main">
                  <div>
                    <h3>{customer.name}</h3>
                    <span className={`status status-${customer.status.toLowerCase()}`}>{customer.status}</span>
                  </div>
                  <button className="icon-button" type="button" onClick={() => removeCustomer(customer.id)} aria-label={`Delete ${customer.name}`}>
                    <Trash2 aria-hidden="true" />
                  </button>
                </div>
                <p>
                  <Mail aria-hidden="true" />
                  <a href={`mailto:${customer.email}`}>{customer.email}</a>
                </p>
                <p>
                  <Phone aria-hidden="true" />
                  <a href={`tel:${customer.phone}`}>{customer.phone}</a>
                </p>
              </article>
            ))}
          </div>

          {filteredCustomers.length === 0 && <p className="empty-state">No customers match your search.</p>}
        </section>
      </section>
    </main>
  );
}

export default App;