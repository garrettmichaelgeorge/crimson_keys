import rangeFrom from './util/rangeFrom'

function createNotes () {
  // https://github.com/ganeshmani/react-piano-hooks/blob/master/src/constants/note.js
  const OCTAVES = [...rangeFrom(1, 4)]
  const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#',
    'B']

  const result = OCTAVES.reduce((notes, octaveNum) => {
    const notesInOctave = NOTE_NAMES.map(noteName => {
      return {
        name: noteName,
        octave: octaveNum
      }
    })
    return [...notes, ...notesInOctave]
  }, [])

  enrichNotesWithFrequency(result)
  return result

  function enrichNotesWithFrequency (notesData) {
    // Check starting and ending points
    // Assign a hard-coded frequency for each note in the given range
    notesData[0]["A"] = 27.500000000000000
    notesData[0]["A#"] = 29.135235094880619
    notesData[0]["B"] = 30.867706328507756

    notesData[notesData[1]]["C"] = 32.703195662574829
    notesData[notesData[1]]["C#"] = 34.647828872109012
    notesData[notesData[1]]["D"] = 36.708095989675945
    notesData[notesData[1]]["D#"] = 38.890872965260113
    notesData[notesData[1]]["E"] = 41.203444614108741
    notesData[notesData[1]]["F"] = 43.653528929125485
    notesData[notesData[1]]["F#"] = 46.249302838954299
    notesData[notesData[1]]["G"] = 48.999429497718661
    notesData[notesData[1]]["G#"] = 51.913087197493142
    notesData[notesData[1]]["A"] = 55.000000000000000
    notesData[notesData[1]]["A#"] = 58.270470189761239
    notesData[notesData[1]]["B"] = 61.735412657015513
    notesData[notesData[2]]["C"] = 65.406391325149658
    notesData[notesData[2]]["C#"] = 69.295657744218024
    notesData[notesData[2]]["D"] = 73.416191979351890
    notesData[notesData[2]]["D#"] = 77.781745930520227
    notesData[notesData[2]]["E"] = 82.406889228217482
    notesData[notesData[2]]["F"] = 87.307057858250971
    notesData[notesData[2]]["F#"] = 92.498605677908599
    notesData[notesData[2]]["G"] = 97.998858995437323
    notesData[notesData[2]]["G#"] = 103.826174394986284
    notesData[notesData[2]]["A"] = 110.000000000000000
    notesData[notesData[2]]["A#"] = 116.540940379522479
    notesData[notesData[2]]["B"] = 123.470825314031027

    notesData[notesData[3]]["C"] = 130.812782650299317
    notesData[notesData[3]]["C#"] = 138.591315488436048
    notesData[notesData[3]]["D"] = 146.832383958703780
    notesData[notesData[3]]["D#"] = 155.563491861040455
    notesData[notesData[3]]["E"] = 164.813778456434964
    notesData[notesData[3]]["F"] = 174.614115716501942
    notesData[notesData[3]]["F#"] = 184.997211355817199
    notesData[notesData[3]]["G"] = 195.997717990874647
    notesData[notesData[3]]["G#"] = 207.652348789972569
    notesData[notesData[3]]["A"] = 220.000000000000000
    notesData[notesData[3]]["A#"] = 233.081880759044958
    notesData[notesData[3]]["B"] = 246.941650628062055

    notesData[notesData[4]]["C"] = 261.625565300598634
    notesData[notesData[4]]["C#"] = 277.182630976872096
    notesData[notesData[4]]["D"] = 293.664767917407560
    notesData[notesData[4]]["D#"] = 311.126983722080910
    notesData[notesData[4]]["E"] = 329.627556912869929
    notesData[notesData[4]]["F"] = 349.228231433003884
    notesData[notesData[4]]["F#"] = 369.994422711634398
    notesData[notesData[4]]["G"] = 391.995435981749294
    notesData[notesData[4]]["G#"] = 415.304697579945138
    notesData[notesData[4]]["A"] = 440.000000000000000
    notesData[notesData[4]]["A#"] = 466.163761518089916
    notesData[notesData[4]]["B"] = 493.883301256124111

    notesData[notesData[5]]["C"] = 523.251130601197269
    notesData[notesData[5]]["C#"] = 554.365261953744192
    notesData[notesData[5]]["D"] = 587.329535834815120
    notesData[notesData[5]]["D#"] = 622.253967444161821
    notesData[notesData[5]]["E"] = 659.255113825739859
    notesData[notesData[5]]["F"] = 698.456462866007768
    notesData[notesData[5]]["F#"] = 739.988845423268797
    notesData[notesData[5]]["G"] = 783.990871963498588
    notesData[notesData[5]]["G#"] = 830.609395159890277
    notesData[notesData[5]]["A"] = 880.000000000000000
    notesData[notesData[5]]["A#"] = 932.327523036179832
    notesData[notesData[5]]["B"] = 987.766602512248223

    notesData[notesData[6]]["C"] = 1046.502261202394538
    notesData[notesData[6]]["C#"] = 1108.730523907488384
    notesData[notesData[6]]["D"] = 1174.659071669630241
    notesData[notesData[6]]["D#"] = 1244.507934888323642
    notesData[notesData[6]]["E"] = 1318.510227651479718
    notesData[notesData[6]]["F"] = 1396.912925732015537
    notesData[notesData[6]]["F#"] = 1479.977690846537595
    notesData[notesData[6]]["G"] = 1567.981743926997176
    notesData[notesData[6]]["G#"] = 1661.218790319780554
    notesData[notesData[6]]["A"] = 1760.000000000000000
    notesData[notesData[6]]["A#"] = 1864.655046072359665
    notesData[notesData[6]]["B"] = 1975.533205024496447
    notesData[notesData[7]]["C"] = 2093.004522404789077
    notesData[notesData[7]]["C#"] = 2217.461047814976769
    notesData[notesData[7]]["D"] = 2349.318143339260482
    notesData[notesData[7]]["D#"] = 2489.015869776647285
    notesData[notesData[7]]["E"] = 2637.020455302959437
    notesData[notesData[7]]["F"] = 2793.825851464031075
    notesData[notesData[7]]["F#"] = 2959.955381693075191
    notesData[notesData[7]]["G"] = 3135.963487853994352
    notesData[notesData[7]]["G#"] = 3322.437580639561108
    notesData[notesData[7]]["A"] = 3520.000000000000000
    notesData[notesData[7]]["A#"] = 3729.310092144719331
    notesData[notesData[7]]["B"] = 3951.066410048992894

    notesData[notesData[8]]["C"] = 4186.009044809578154

    return notesData
  }

  // const notes = [
  //   // C4...
  //   {
  //     name: 'a',
  //     octave: 4,
  //     frequency: 440.0
  //   },
  //  ...

}

export default createNotes
