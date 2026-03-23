import { useState } from 'react';
import { useBackup } from '@/hooks/useBackUp';

const BackUpBoard = () => {
  const [format, setFormat] = useState<'sql' | 'dump'>('sql');

  const backupMutation = useBackup();

  const handleDownload = () => {
    backupMutation.mutate(format);
  };

  return (
    <div className="p-6 max-w-lg">
      <h1 className="text-2xl font-bold mb-4">Database Backup</h1>

      {/* Format selector */}
      <select
        value={format}
        onChange={(e) => setFormat(e.target.value as 'sql' | 'dump')}
        className="border p-2 rounded mb-4 w-full"
      >
        <option value="sql">SQL (.sql)</option>
        <option value="dump">Custom (.dump)</option>
      </select>

      {/* Button */}
      <button
        onClick={handleDownload}
        disabled={backupMutation.isPending}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
      >
        {backupMutation.isPending ? 'Creating Backup...' : 'Download Backup'}
      </button>
    </div>
  );
};

export default BackUpBoard;
