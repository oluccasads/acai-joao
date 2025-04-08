let orders = [
    {
        id: "01",
        customer: "Maria Silva",
        total: 28.90,
        date: "2025-04-07T14:30:00",
        deliveredAt: "2025-04-07T15:00:00",
        status: "delivered",
        items: [
            { name: "Açaí 500ml", quantity: 1, price: 18.90 },
            { name: "Adicional Granola", quantity: 1, price: 5.00 },
            { name: "Adicional Banana", quantity: 1, price: 5.00 }
        ],
        notes: "",
        address: "Rua das Flores, 123",
        city: "São Paulo",
        neighborhood: "Jardim Paulista"
    },
    {
        id: "02",
        customer: "João Pereira",
        total: 32.80,
        date: "2025-04-06T15:15:00",
        status: "preparing",
        items: [
            { name: "Açaí 700ml", quantity: 1, price: 22.90 },
            { name: "Adicional Morango", quantity: 1, price: 6.00 },
            { name: "Adicional Leite Condensado", quantity: 1, price: 3.90 }
        ],
        notes: "Sem banana, por favor.",
        address: "Avenida Central, 456",
        city: "São Paulo",
        neighborhood: "Vila Mariana"
    },
    {
        id: "03",
        customer: "Ana Costa",
        total: 45.70,
        date: "2025-04-05T13:45:00",
        deliveredAt: "2025-04-05T14:15:00",
        status: "delivered",
        items: [
            { name: "Açaí 500ml", quantity: 2, price: 37.80 },
            { name: "Adicional Granola", quantity: 1, price: 5.00 },
            { name: "Adicional Mel", quantity: 1, price: 2.90 }
        ],
        notes: "Entregar até 14:30",
        address: "Rua do Sol, 789",
        city: "São Paulo",
        neighborhood: "Pinheiros"
    },
    {
        id: "04",
        customer: "Carlos Santos",
        total: 52.80,
        date: "2025-03-15T19:20:00",
        status: "in_transit",
        items: [
            { name: "Açaí 700ml", quantity: 2, price: 45.80 },
            { name: "Adicional Granola", quantity: 1, price: 5.00 },
            { name: "Adicional Mel", quantity: 1, price: 2.00 }
        ],
        notes: "",
        address: "Rua da Lua, 101",
        city: "São Paulo",
        neighborhood: "Jardim Paulista"
    },
    {
        id: "05",
        customer: "Roberto Oliveira",
        total: 18.90,
        date: "2025-03-01T20:10:00",
        status: "cancelled",
        items: [
            { name: "Açaí 500ml", quantity: 1, price: 18.90 }
        ],
        notes: "Cancelado pelo cliente - mudou de ideia",
        address: "Avenida das Estrelas, 202",
        city: "São Paulo",
        neighborhood: "Vila Mariana"
    },
    {
        id: "06",
        customer: "Mariana Lima",
        total: 42.70,
        date: "2025-04-01T12:05:00",
        status: "in_transit",
        items: [
            { name: "Açaí 700ml", quantity: 1, price: 22.90 },
            { name: "Açaí 300ml", quantity: 1, price: 12.90 },
            { name: "Adicional Granola", quantity: 2, price: 6.90 }
        ],
        notes: "",
        address: "Rua das Palmeiras, 303",
        city: "São Paulo",
        neighborhood: "Moema"
    },
    {
        id: "07",
        customer: "Fernanda Almeida",
        total: 35.50,
        date: "2025-02-15T14:00:00",
        status: "delivered",
        deliveredAt: "2025-02-15T14:30:00",
        items: [
            { name: "Açaí 500ml", quantity: 1, price: 18.90 },
            { name: "Adicional Morango", quantity: 1, price: 6.00 },
            { name: "Adicional Granola", quantity: 1, price: 5.00 }
        ],
        notes: "",
        address: "Rua Nova, 505",
        city: "São Paulo",
        neighborhood: "Moema"
    }
];

let filteredOrders = [...orders];

const filterPreset = document.getElementById('filterPreset');
const filterStartDate = document.getElementById('filterStartDate');
const filterEndDate = document.getElementById('filterEndDate');
const customDateRange = document.getElementById('customDateRange');
const customDateRangeEnd = document.getElementById('customDateRangeEnd');
const resetFilters = document.getElementById('resetFilters');
const applyFilters = document.getElementById('applyFilters');
const exportCSV = document.getElementById('exportCSV');
const filtersForm = document.getElementById('filtersForm');
const periodInfo = document.getElementById('periodInfo');

// Função para formatar uma data no formato DD/MM/YYYY
function formatDate(date) {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        return "--/--/----";
    }
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        timeZone: 'UTC'
    });
}

// Função para calcular o intervalo de datas com base no filtro
function getDateRange(preset, customStart = null, customEnd = null, referenceDate = new Date('2025-04-08T00:00:00Z')) {
    // Garante que referenceDate esteja em UTC
    const todayUTC = new Date(Date.UTC(
        referenceDate.getUTCFullYear(),
        referenceDate.getUTCMonth(),
        referenceDate.getUTCDate()
    ));

    // Subtrai 1 dia para excluir o dia atual (usado em "Últimos 7 dias" e "Últimos 30 dias")
    const yesterdayUTC = new Date(todayUTC);
    yesterdayUTC.setUTCDate(todayUTC.getUTCDate() - 1);

    let startDate, endDate;

    switch (preset) {
        case 'last7days':
            startDate = new Date(yesterdayUTC);
            startDate.setUTCDate(yesterdayUTC.getUTCDate() - 6); // 7 dias antes de ontem
            endDate = new Date(yesterdayUTC);
            break;
        case 'last30days':
            startDate = new Date(yesterdayUTC);
            startDate.setUTCDate(yesterdayUTC.getUTCDate() - 29); // 30 dias antes de ontem
            endDate = new Date(yesterdayUTC);
            break;
        case 'thisMonth':
            startDate = new Date(Date.UTC(todayUTC.getUTCFullYear(), todayUTC.getUTCMonth(), 1));
            endDate = new Date(todayUTC); // Inclui o dia atual
            break;
        case 'lastMonth':
            startDate = new Date(Date.UTC(todayUTC.getUTCFullYear(), todayUTC.getUTCMonth() - 1, 1));
            endDate = new Date(Date.UTC(todayUTC.getUTCFullYear(), todayUTC.getUTCMonth(), 0));
            break;
        case 'custom':
            if (customStart && customEnd) {
                startDate = new Date(customStart);
                endDate = new Date(customEnd);
                if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                    startDate = new Date(yesterdayUTC);
                    startDate.setUTCDate(yesterdayUTC.getUTCDate() - 29);
                    endDate = new Date(yesterdayUTC);
                } else {
                    startDate = new Date(Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate()));
                    endDate = new Date(Date.UTC(endDate.getUTCFullYear(), endDate.getUTCMonth(), endDate.getUTCDate()));
                }
            } else {
                startDate = new Date(yesterdayUTC);
                startDate.setUTCDate(yesterdayUTC.getUTCDate() - 29);
                endDate = new Date(yesterdayUTC);
            }
            break;
        default:
            startDate = new Date(yesterdayUTC);
            startDate.setUTCDate(yesterdayUTC.getUTCDate() - 29);
            endDate = new Date(yesterdayUTC);
    }

    return { startDate, endDate };
}

function initDashboard() {
    const today = new Date('2025-04-08T00:00:00Z');
    const maxDate = today.toISOString().split('T')[0];
    filterStartDate.setAttribute('max', maxDate);
    filterEndDate.setAttribute('max', maxDate);

    const savedPreset = localStorage.getItem('filterPreset');
    const savedStartDate = localStorage.getItem('filterStartDate');
    const savedEndDate = localStorage.getItem('filterEndDate');

    if (savedPreset) {
        filterPreset.value = savedPreset;
        if (savedPreset === 'custom' && savedStartDate && savedEndDate) {
            filterStartDate.value = savedStartDate;
            filterEndDate.value = savedEndDate;
            customDateRange.style.display = 'block';
            customDateRangeEnd.style.display = 'block';
        }
    } else {
        filterPreset.value = 'lastMonth';
    }

    applyDashboardFilters();
    setupEventListeners();
}

function updatePeriodInfo() {
    const preset = filterPreset.value;
    const customStart = filterStartDate.value;
    const customEnd = filterEndDate.value;

    const { startDate, endDate } = getDateRange(preset, customStart, customEnd);
    periodInfo.textContent = `Mostrando dados de ${formatDate(startDate)} a ${formatDate(endDate)}`;
}

function setupEventListeners() {
    filterPreset.addEventListener('change', () => {
        if (filterPreset.value === 'custom') {
            customDateRange.style.display = 'block';
            customDateRangeEnd.style.display = 'block';
        } else {
            customDateRange.style.display = 'none';
            customDateRangeEnd.style.display = 'none';
            applyDashboardFilters();
        }
    });

    resetFilters.addEventListener('click', clearFilters);
    applyFilters.addEventListener('click', applyDashboardFilters);
    exportCSV.addEventListener('click', exportToCSV);
    filtersForm.addEventListener('submit', (e) => {
        e.preventDefault();
        applyDashboardFilters();
    });
}

function applyDashboardFilters() {
    const preset = filterPreset.value;
    let startDate, endDate;

    if (preset === 'custom') {
        const startDateStr = filterStartDate.value;
        const endDateStr = filterEndDate.value;

        if (!startDateStr || !endDateStr) {
            alert("Por favor, selecione as datas de início e término.");
            return;
        }

        const customStart = new Date(startDateStr);
        const customEnd = new Date(endDateStr);
        const today = new Date('2025-04-08T00:00:00Z');

        if (customStart > today || customEnd > today) {
            alert("Não é possível selecionar datas futuras.");
            return;
        }

        if (customEnd < customStart) {
            alert("A data de término deve ser maior ou igual à data de início.");
            return;
        }

        ({ startDate, endDate } = getDateRange(preset, startDateStr, endDateStr, today));
    } else {
        ({ startDate, endDate } = getDateRange(preset, null, null, new Date('2025-04-08T00:00:00Z')));
    }

    const startTimestamp = startDate.getTime();
    const endTimestamp = endDate.getTime() + (24 * 60 * 60 * 1000 - 1);

    filteredOrders = orders.filter(order => {
        const orderDate = new Date(order.date);
        const orderDateOnly = new Date(Date.UTC(orderDate.getUTCFullYear(), orderDate.getUTCMonth(), orderDate.getUTCDate()));
        const orderTimestamp = orderDateOnly.getTime();

        return orderTimestamp >= startTimestamp && orderTimestamp <= endTimestamp;
    });

    localStorage.setItem('filterPreset', preset);
    if (preset === 'custom') {
        localStorage.setItem('filterStartDate', filterStartDate.value);
        localStorage.setItem('filterEndDate', filterEndDate.value);
    } else {
        localStorage.removeItem('filterStartDate');
        localStorage.removeItem('filterEndDate');
    }

    updateDashboard();
    updatePeriodInfo();
}

function clearFilters() {
    filterPreset.value = 'lastMonth';
    filterStartDate.value = '';
    filterEndDate.value = '';
    customDateRange.style.display = 'none';
    customDateRangeEnd.style.display = 'none';
    localStorage.removeItem('filterPreset');
    localStorage.removeItem('filterStartDate');
    localStorage.removeItem('filterEndDate');
    applyDashboardFilters();
}

function exportToCSV() {
    if (filteredOrders.length === 0) {
        alert("Não há dados para exportar.");
        return;
    }

    const headers = [
        "ID",
        "Cliente",
        "Total (R$)",
        "Data",
        "Status",
        "Itens",
        "Notas",
        "Endereço",
        "Bairro"
    ];

    const rows = filteredOrders.map(order => {
        const items = order.items.map(item => `${item.name} (${item.quantity})`).join(", ");
        return [
            order.id,
            order.customer,
            order.total.toFixed(2),
            new Date(order.date).toLocaleString(),
            order.status,
            items,
            order.notes || "",
            order.address,
            order.neighborhood
        ].map(value => `"${value}"`).join(",");
    });

    const csvContent = [headers.join(","), ...rows].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "pedidos_joao_do_acai.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function updateDashboard() {
    document.getElementById('totalOrders').textContent = filteredOrders.length;

    const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.total, 0);
    document.getElementById('totalRevenue').textContent = `R$ ${totalRevenue.toFixed(2).replace('.', ',')}`;

    const deliveredOrders = filteredOrders.filter(order => order.status === 'delivered' && order.deliveredAt);
    let avgDeliveryTime = 0;
    let onTimeDeliveries = 0;
    const maxDeliveryTime = 45;
    
    if (deliveredOrders.length > 0) {
        const totalDeliveryTime = deliveredOrders.reduce((sum, order) => {
            const orderDate = new Date(order.date);
            const deliveredDate = new Date(order.deliveredAt);
            const diffMs = deliveredDate - orderDate;
            const deliveryTime = diffMs / (1000 * 60);
            if (deliveryTime <= maxDeliveryTime) {
                onTimeDeliveries++;
            }
            return sum + deliveryTime;
        }, 0);
        avgDeliveryTime = totalDeliveryTime / deliveredOrders.length;
    }
    document.getElementById('avgDeliveryTime').textContent = `${Math.round(avgDeliveryTime)} min`;

    const onTimeDeliveryRate = deliveredOrders.length > 0 ? (onTimeDeliveries / deliveredOrders.length) * 100 : 0;
    document.getElementById('onTimeDeliveryRate').textContent = `${onTimeDeliveryRate.toFixed(1)}%`;

    const cancelledOrders = filteredOrders.filter(order => order.status === 'cancelled').length;
    const cancelRate = filteredOrders.length > 0 ? (cancelledOrders / filteredOrders.length) * 100 : 0;
    document.getElementById('cancelRate').textContent = `${cancelRate.toFixed(1)}%`;

    const statusCounts = {
        pending: 0,
        preparing: 0,
        in_transit: 0,
        delivered: 0,
        cancelled: 0
    };
    
    filteredOrders.forEach(order => {
        if (statusCounts.hasOwnProperty(order.status)) {
            statusCounts[order.status]++;
        }
    });
    
    const statusDistribution = document.getElementById('statusDistribution');
    statusDistribution.innerHTML = '';
    
    for (const [status, count] of Object.entries(statusCounts)) {
        const percentage = filteredOrders.length > 0 ? (count / filteredOrders.length) * 100 : 0;
        const statusLabel = {
            pending: 'Pendente',
            preparing: 'Em Preparo',
            in_transit: 'Em Rota',
            delivered: 'Entregue',
            cancelled: 'Cancelado'
        }[status];
        
        const statusItem = document.createElement('div');
        statusItem.classList.add('status-item');
        statusItem.innerHTML = `
            <div class="status-label">${statusLabel}: ${count}</div>
            <div class="status-bar">
                <div class="status-bar-fill ${status.replaceAll('_', '-')}" style="width: ${percentage}%"></div>
            </div>
        `;
        statusDistribution.appendChild(statusItem);
    }

    const neighborhoodCounts = {};
    filteredOrders.forEach(order => {
        neighborhoodCounts[order.neighborhood] = (neighborhoodCounts[order.neighborhood] || 0) + 1;
    });
    
    const neighborhoodDistribution = document.getElementById('neighborhoodDistribution');
    neighborhoodDistribution.innerHTML = '';
    
    Object.entries(neighborhoodCounts)
        .sort((a, b) => b[1] - a[1])
        .forEach(([neighborhood, count]) => {
            const neighborhoodItem = document.createElement('div');
            neighborhoodItem.classList.add('neighborhood-item');
            neighborhoodItem.innerHTML = `
                <span>${neighborhood}</span>
                <span>${count} pedido${count > 1 ? 's' : ''}</span>
            `;
            neighborhoodDistribution.appendChild(neighborhoodItem);
        });

    const timeCounts = {
        morning: 0,
        afternoon: 0,
        evening: 0
    };
    
    filteredOrders.forEach(order => {
        const orderHour = new Date(order.date).getHours();
        if (orderHour < 12) {
            timeCounts.morning++;
        } else if (orderHour < 18) {
            timeCounts.afternoon++;
        } else {
            timeCounts.evening++;
        }
    });
    
    const timeDistribution = document.getElementById('timeDistribution');
    timeDistribution.innerHTML = '';
    
    const timeLabels = {
        morning: 'Manhã (00:00 - 11:59)',
        afternoon: 'Tarde (12:00 - 17:59)',
        evening: 'Noite (18:00 - 23:59)'
    };
    
    for (const [time, count] of Object.entries(timeCounts)) {
        const percentage = filteredOrders.length > 0 ? (count / filteredOrders.length) * 100 : 0;
        const timeItem = document.createElement('div');
        timeItem.classList.add('time-item');
        timeItem.innerHTML = `
            <div class="time-label">${timeLabels[time]}: ${count}</div>
            <div class="time-bar">
                <div class="time-bar-fill ${time}" style="width: ${percentage}%"></div>
            </div>
        `;
        timeDistribution.appendChild(timeItem);
    }

    const itemCounts = {};
    filteredOrders.forEach(order => {
        order.items.forEach(item => {
            itemCounts[item.name] = (itemCounts[item.name] || 0) + item.quantity;
        });
    });
    
    const topItems = Object.entries(itemCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
    
    const topItemsDiv = document.getElementById('topItems');
    topItemsDiv.innerHTML = '';
    
    topItems.forEach(([itemName, quantity]) => {
        const itemRow = document.createElement('div');
        itemRow.classList.add('item-row');
        itemRow.innerHTML = `
            <span>${itemName}</span>
            <span>${quantity} unidade${quantity > 1 ? 's' : ''}</span>
        `;
        topItemsDiv.appendChild(itemRow);
    });
}

document.addEventListener('DOMContentLoaded', initDashboard);