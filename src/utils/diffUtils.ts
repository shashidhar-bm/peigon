import { DiffNode, DiffType } from '../types/comparison.types';

/**
 * Computes the difference between two values (objects, arrays, or primitives)
 * Returns a DiffNode tree representing the changes
 */
export function computeDiff(
    oldValue: any,
    newValue: any,
    path: string = 'root'
): DiffNode {
    // Handle null/undefined cases
    if (oldValue === null && newValue === null) {
        return { path, type: 'unchanged', oldValue, newValue };
    }

    if (oldValue === undefined && newValue === undefined) {
        return { path, type: 'unchanged', oldValue, newValue };
    }

    if (oldValue === null || oldValue === undefined) {
        return { path, type: 'added', newValue };
    }

    if (newValue === null || newValue === undefined) {
        return { path, type: 'removed', oldValue };
    }

    // Get types
    const oldType = getValueType(oldValue);
    const newType = getValueType(newValue);

    // Type changed
    if (oldType !== newType) {
        return { path, type: 'modified', oldValue, newValue };
    }

    // Handle primitives
    if (oldType === 'primitive') {
        if (oldValue === newValue) {
            return { path, type: 'unchanged', oldValue, newValue };
        }
        return { path, type: 'modified', oldValue, newValue };
    }

    // Handle arrays
    if (oldType === 'array') {
        return computeArrayDiff(oldValue, newValue, path);
    }

    // Handle objects
    if (oldType === 'object') {
        return computeObjectDiff(oldValue, newValue, path);
    }

    // Fallback
    return { path, type: 'unchanged', oldValue, newValue };
}

/**
 * Computes diff for arrays
 */
function computeArrayDiff(
    oldArray: any[],
    newArray: any[],
    path: string
): DiffNode {
    const children: DiffNode[] = [];
    const maxLength = Math.max(oldArray.length, newArray.length);

    for (let i = 0; i < maxLength; i++) {
        const itemPath = `${path}[${i}]`;
        const oldItem = i < oldArray.length ? oldArray[i] : undefined;
        const newItem = i < newArray.length ? newArray[i] : undefined;

        children.push(computeDiff(oldItem, newItem, itemPath));
    }

    // Determine overall type
    const hasChanges = children.some(child => child.type !== 'unchanged');
    const type: DiffType = hasChanges ? 'modified' : 'unchanged';

    return {
        path,
        type,
        oldValue: oldArray,
        newValue: newArray,
        children,
    };
}

/**
 * Computes diff for objects
 */
function computeObjectDiff(
    oldObj: Record<string, any>,
    newObj: Record<string, any>,
    path: string
): DiffNode {
    const children: DiffNode[] = [];
    const allKeys = new Set([...Object.keys(oldObj), ...Object.keys(newObj)]);

    allKeys.forEach(key => {
        const keyPath = path === 'root' ? key : `${path}.${key}`;
        const oldValue = oldObj[key];
        const newValue = newObj[key];

        children.push(computeDiff(oldValue, newValue, keyPath));
    });

    // Determine overall type
    const hasChanges = children.some(child => child.type !== 'unchanged');
    const type: DiffType = hasChanges ? 'modified' : 'unchanged';

    return {
        path,
        type,
        oldValue: oldObj,
        newValue: newObj,
        children,
    };
}

/**
 * Gets the type category of a value
 */
function getValueType(value: any): 'primitive' | 'array' | 'object' | 'null' {
    if (value === null) return 'null';
    if (Array.isArray(value)) return 'array';
    if (typeof value === 'object') return 'object';
    return 'primitive';
}

/**
 * Flattens a diff tree into a list of changed paths
 */
export function flattenDiffPaths(diffNode: DiffNode): DiffNode[] {
    const result: DiffNode[] = [];

    function traverse(node: DiffNode) {
        if (node.type !== 'unchanged') {
            result.push({
                path: node.path,
                type: node.type,
                oldValue: node.oldValue,
                newValue: node.newValue,
            });
        }

        if (node.children) {
            node.children.forEach(traverse);
        }
    }

    traverse(diffNode);
    return result;
}

/**
 * Counts the number of changes by type
 */
export function countDiffChanges(diffNode: DiffNode): {
    added: number;
    removed: number;
    modified: number;
    unchanged: number;
} {
    const counts = {
        added: 0,
        removed: 0,
        modified: 0,
        unchanged: 0,
    };

    function traverse(node: DiffNode) {
        // Only count leaf nodes (nodes without children or with primitive children)
        const isLeaf = !node.children || node.children.length === 0;

        if (isLeaf) {
            counts[node.type]++;
        }

        if (node.children) {
            node.children.forEach(traverse);
        }
    }

    traverse(diffNode);
    return counts;
}

/**
 * Formats a JSON path for display
 */
export function formatJsonPath(path: string): string {
    if (path === 'root') return '/';
    return path.replace(/^root\./, '').replace(/\./g, ' › ');
}
