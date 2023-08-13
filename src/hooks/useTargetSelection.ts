import { useState } from 'react';

export function useTargetSelection() {
    const [selectedTargetId, setSelectedTargetId] = useState<number|null>(null);

    const selectTarget = (id: number) => {
        if (!selectedTargetId) {
            setSelectedTargetId(id);
        }
    };

    const clearSelectedTarget = () => {
        setSelectedTargetId(null);
    };

    return {
        selectedTargetId,
        selectTarget,
        clearSelectedTarget
    };
}
