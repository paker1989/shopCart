import Sortable from 'sortablejs';

export function initSortable(el, onMove) {
	let initState = [];

	let sortable = Sortable.create(el, {
		onStart() {
			initState = sortable.toArray();
		  },
		  
		onEnd(evt) {
			sortable.sort(initState);
			onMove && onMove(evt);
		}
	});
	return sortable;
}