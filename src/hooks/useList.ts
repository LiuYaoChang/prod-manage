import { useState } from 'react'

export interface Actions<T> {
	set: (list: T[]) => void
	clear: () => void
	insert: (index: number, item: T) => void
	remove: (index: number) => void
	push: (item: T) => void
	filter: (fn: (value: T) => boolean) => void
	sort: (fn?: (a: T, b: T) => number) => void
}

const useList = <T>(initialList: T[] = []): [T[], Actions<T>] => {
	const [list, set] = useState<T[]>(initialList)

	return [
		list,
		{
			set,
			clear: () => set([]),
			insert: (index, elem) =>
				set(currentList => [...currentList.slice(0, index), elem, ...list.slice(index + 1)]),
			remove: index => set(currentList => [...currentList.slice(0, index), ...list.slice(index + 1)]),
			push: elem => set(currentList => [...currentList, elem]),
			filter: fn => set(currentList => currentList.filter(fn)),
			sort: (fn?) => set(currentList => [...currentList].sort(fn))
		}
	]
}

export default useList
