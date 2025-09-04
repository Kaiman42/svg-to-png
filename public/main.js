const toPng = async (svg, width, height) => {
  const res = await fetch('/api/convert', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ svg, width, height })
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || 'Erro na conversão');
  }

  const blob = await res.blob();
  return blob;
};

const addResultCard = (name, blob) => {
  const url = URL.createObjectURL(blob);
  const container = document.getElementById('resultsContainer');
  const card = document.createElement('div');
  card.className = 'result-card';

  const title = document.createElement('div');
  title.className = 'result-title';
  title.textContent = name;

  const img = document.createElement('img');
  img.src = url;
  img.alt = name;

  const dl = document.createElement('a');
  dl.href = url;
  dl.download = (name || 'image') + '.png';
  dl.textContent = 'Baixar PNG';
  dl.className = 'download-btn';

  card.appendChild(title);
  card.appendChild(img);
  card.appendChild(dl);
  container.prepend(card);
};

document.getElementById('convert').addEventListener('click', async () => {
  const svg = document.getElementById('svgInput').value;
  const width = parseInt(document.getElementById('width').value) || undefined;
  const height = parseInt(document.getElementById('height').value) || undefined;
  try {
    const blob = await toPng(svg, width, height);
    addResultCard('entrada', blob);
  } catch (err) {
    alert(err.message || 'Erro');
  }
});

document.getElementById('convertFiles').addEventListener('click', async () => {
  const input = document.getElementById('fileInput');
  const files = Array.from(input.files || []);
  if (!files.length) {
    alert('Nenhum arquivo selecionado');
    return;
  }

  const width = parseInt(document.getElementById('width').value) || undefined;
  const height = parseInt(document.getElementById('height').value) || undefined;

  for (const file of files) {
    try {
      const text = await file.text();
      const blob = await toPng(text, width, height);
      addResultCard(file.name.replace(/\.svg$/i, ''), blob);
    } catch (err) {
      console.error('file convert error', file.name, err);
      alert(`Erro ao converter ${file.name}: ${err.message || err}`);
    }
  }
});
