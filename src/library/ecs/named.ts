import {INamed} from '../interfaces/INamed'

export function named(name: string, data: INamed) {
	data.name = name
	return data
}