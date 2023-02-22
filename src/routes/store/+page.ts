import type { PageLoad } from './$types';
import FileItemsStore from '$lib/store/files';
import { Priority } from '$lib/enum/priority';
import { AccessLevel } from '$lib/enum/access-level';

function getKeyByValue(enumType, value: string) {
    const indexOfS = Object.values(enumType).indexOf(value);
    const key = Object.keys(enumType)[indexOfS];
  
    return key;
  }

async function getFiles() {
    const requestOptions = {
        method: 'GET'
    };

    const res = await fetch('http://localhost:8080/files/meta', requestOptions);
    const data = await res.json();

    return data;
}

export const load = (async () => {
    const files = await getFiles();
    const mappedFiels = files.map(file => ({
        ...file,
        data: file.createdAt,
        priority: getKeyByValue(Priority, file.priority),
        accessLevel: getKeyByValue(AccessLevel, file.accessLevel),
    }));

    FileItemsStore.set(mappedFiels);

    return {
        files
    };
}) satisfies PageLoad;