export const streetwalkerData = [
	{
		plugin: 'Firmy',
		items: ['Firma A', 'Firma B', 'nazev'],
		actions: [
			{
				label: 'Add new',
				action: () => console.log('function add new - Firma_handler')
			}, {
				label: 'Edit',
				action: () => console.log('function edit - Firma_handler')
			}, {
				label: 'Show',
				action: () => console.log('function show - Firma_handler')
			},
		]
	}, {
		plugin: 'Faktury',
		items: ['f001', 'f002', 'f003', 'f004', 'f005'],
		actions: [
			{
				label: 'Edit',
				action: () => console.log('function edit - Faktura_handler')
			}, {
				label: 'Show',
				action: () => console.log('function show - Faktura_handler')
			}, {
				label: 'Delete',
				action: () => console.log('function delete - Faktura_handler')
			}
		]
	}
];
